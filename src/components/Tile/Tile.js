import React, { Component } from 'react';

import { GeolocalisationIcon } from '../GeolocalisationIcon/GeolocalisationIcon';
import {deleteArticle, fbEditArticle } from "../../services/Firebase";
import editIcon from '../../assets/images/edit.svg';
import saveIcon from '../../assets/images/save.svg';
import deleteIcon from '../../assets/images/delete.svg';


import './Tile.css';
import {Time} from "../Time/Time";

export class Tile extends Component {

    constructor(props) {
        super(props);

        const { id, city, picture, text, timestamp } = this.props.datas;
        this.state = {
            id: id,
            city: city,
            picture: picture,
            text: text,
            timestamp: timestamp,
            disposition: 'default',
            mode: 'read'
        };
    }

    updateTimestamp = (timestamp) => {

        this.setState({
            timestamp: timestamp
        });
    };

    editTile() {
        this.setState({
            mode: 'edition'
        });
    }

    async saveTile() {
        const { id, city, picture, text, timestamp, disposition } = this.state;
        const { update } = this.props;
        this.setState({
            mode: 'read'
        });
        await fbEditArticle({
            id: id,
            city: city,
            picture: picture,
            text: text,
            timestamp: timestamp,
            disposition: disposition
        });
        update(true);
    }

    deleteTile() {
        const { datas, update } = this.props;
        let response = window.confirm('etes vous sur de vouloir supprimer ?');
        if(response) {

            deleteArticle(datas.id);
            update(true);
        }
    }

    render() {
        const { isAdmin } = this.props;
        const { city, picture, text, timestamp } = this.state;

        let className = isAdmin ? "tile tile--admin" : "tile";
        className += this.state.mode === 'edition' ? " tile--edition" : "";

        return (
            <React.Fragment>
                {
                    this.state.mode === 'edition'
                        ? <article className={className}>
                            <Time time={timestamp} mode={this.state.mode} getTimestamp={this.updateTimestamp} />
                            <p className="tile__geolocalisation">{GeolocalisationIcon}<input placeholder="Ville" type="text" value={city ? city : ''} onChange={e => this.setState({ city: e.target.value})} /></p>
                            <figure className="tile__picture">
                                <img alt="little think" title="" src={picture} />
                            </figure>
                            <p className="tile__text"><textarea placeholder="petite phrase en surplus (facultative)" type="text" value={text} onChange={e => this.setState({ text: e.target.value})} /></p>
                            <div className="tile__manage">
                                <button onClick={(e) => this.saveTile(e)}><img src={saveIcon} /></button>
                            </div>
                        </article>
                        : <article className={className}>
                            <Time time={timestamp}/>
                            {
                                city
                                    ? <p className="tile__geolocalisation">{GeolocalisationIcon}{city}</p>
                                    : null
                            }
                            <figure className="tile__picture">
                                <img alt="little think" title="" src={picture} />
                            </figure>
                            {
                                text
                                    ? <p className="tile__text">{text}</p>
                                    : null
                            }
                            {
                                isAdmin
                                    ?   <div className="tile__manage">
                                            <button onClick={(e) => this.editTile(e)}><img src={editIcon} /></button>
                                            <button onClick={(e) => this.deleteTile(e)}><img src={deleteIcon} /></button>
                                        </div>
                                    : null
                            }
                        </article>
                }
            </React.Fragment>
        );
    }
}
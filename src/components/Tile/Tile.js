import React, { Component } from 'react';

import { GeolocalisationIcon } from '../GeolocalisationIcon/GeolocalisationIcon';
import { deleteArticle, editArticle } from "../../services/Firebase";

import './Tile.css';
import {Time} from "../Time/Time";

export class Tile extends Component {

    state = {
        mode: 'read'
    };

    editTile() {
        this.setState({
            mode: 'edition'
        });
    }

    saveTile() {
        this.setState({
            mode: 'read'
        });
    }

    deleteTile() {
        const { datas } = this.props;
        console.log(datas.id);
        let response = window.confirm('etes vous sur de vouloir supprimer ?');
        if(response) {

            deleteArticle(datas.id);
        }
    }

    render() {
        const { datas, isAdmin } = this.props;
        const imageURL = datas.picture;

        let className = isAdmin ? "tile tile--admin" : "tile";
        className += this.state.mode === 'edition' ? " tile--edition" : "";

        return (
            <React.Fragment>
                <article className={className}>
                    <Time time={datas.timestamp}/>
                    {
                        datas.city
                        ? <p className="tile__geolocalisation">{GeolocalisationIcon}{datas.city}</p>
                        : null
                    }
                    <figure className="tile__picture">
                        <img alt="little think" title="" src={imageURL} />
                    </figure>
                    {
                        datas.text
                            ? <p className="tile__text">{datas.text}</p>
                            : null
                    }
                    {
                        isAdmin
                        ?   <div className="tile__manage">
                                <button onClick={(e) => this.editTile(e)}>edit</button>
                                <button onClick={(e) => this.saveTile(e)}>save</button>
                                <button onClick={(e) => this.deleteTile(e)}>delete</button>
                            </div>
                        : null
                    }
                </article>
            </React.Fragment>
        );
    }
}
import React, { Component } from 'react';

import { GeolocalisationIcon } from '../GeolocalisationIcon/GeolocalisationIcon';
import {deleteArticle, fbEditArticle, fbgetPicture, fbdeletePicture } from "../../services/Firebase";
import editIcon from '../../assets/images/edit.svg';
import saveIcon from '../../assets/images/save.svg';
import deleteIcon from '../../assets/images/delete.svg';
import { toast } from 'react-toastify';
import { Time } from "../Time/Time";
import { Trad } from "../Trad/Trad";
import Img from 'react-fix-image-orientation';

import './Tile.css';

export class Tile extends Component {

    constructor(props) {
        super(props);

        const { lang } = this.props;
        const { id, city, filename, text, textEn, timestamp } = this.props.datas;
        this.getPicture(filename);
        this.state = {
            lang: lang,
            id: id,
            city: city,
            filename: filename,
            picture: null,
            text: text,
            textEn: textEn,
            timestamp: timestamp,
            disposition: 'default',
            mode: 'read'
        };
    }

    async getPicture(filename) {

        const result = await fbgetPicture(filename);
        this.setState({
            picture: result
        });
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

        const { id, city, filename, text, textEn, timestamp, disposition } = this.state;
        const { update, lang } = this.props;
        this.setState({
            mode: 'read'
        });
        console.log(text, textEn);
        await fbEditArticle({
            id: id,
            city: city,
            filename: filename,
            text: text,
            textEn: textEn,
            timestamp: timestamp,
            disposition: disposition
        });
        update(true);
        toast.success(<Trad lang={lang} code={'tile.toast.save.success'}/>);
    }

    async deleteTile() {

        const { datas, update, lang } = this.props;
        let response = window.confirm('etes vous sur de vouloir supprimer ?');
        if(response) {

            await fbdeletePicture(datas.filename);
            await deleteArticle(datas.id);
            update(true);
            toast.success(<Trad lang={lang} code={'tile.toast.delete.success'}/>);
        }
    }

    render() {
        const { isAdmin } = this.props;
        const { lang, city, picture, text, textEn, timestamp } = this.state;

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
                                <Img alt="little think" title="" src={picture} />
                            </figure>
                            <p className="tile__text"><textarea placeholder="[FR] petite phrase en surplus (facultative)" type="text" value={text} onChange={e => this.setState({ text: e.target.value})} /></p>
                            <p className="tile__text"><textarea placeholder="[EN] little extra sentence (optional)" type="text" value={textEn} onChange={e => this.setState({ textEn: e.target.value})} /></p>
                            <div className="tile__manage">
                                <button onClick={(e) => this.saveTile(e)}><img src={saveIcon} /></button>
                            </div>
                        </article>
                        : <article className={className}>
                            <Time lang={lang} time={timestamp}/>
                            {
                                city
                                    ? <div className="tile__geolocalisation">{GeolocalisationIcon}<p>{city}</p></div>
                                    : null
                            }
                            <figure className={`tile__picture${picture === null ? ' tile__picture--pending' : ''}`}>
                                <Img alt="little think" title="" src={picture} />
                            </figure>
                            {
                                lang === 'fr-FR' && text
                                    ? <p className="tile__text">{text}</p>
                                    : null
                            }
                            {
                                lang === 'en-EN' && textEn
                                    ? <p className="tile__text">{textEn}</p>
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
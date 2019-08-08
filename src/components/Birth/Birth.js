import React, { Component } from 'react';

import birthIcon from '../../assets/images/baby.svg';
import editIcon from '../../assets/images/edit.svg';
import saveIcon from '../../assets/images/save.svg';
import {GeolocalisationIcon} from "../GeolocalisationIcon/GeolocalisationIcon";
import {Time} from "../Time/Time";
import {Trad} from "../Trad/Trad";
import { fbEditBirth } from "../../services/Firebase";
import { toast } from 'react-toastify';

import './Birth.css';

export class Birth extends Component {

    constructor(props) {
        super(props);

        const { lang } = this.props;
        const { city, name, weight, size, text, textEn, timestamp } = this.props.datas;
        this.state = {
            lang: lang,
            city: city,
            name: name,
            size: size,
            weight: weight,
            text: text,
            textEn: textEn,
            timestamp: timestamp,
            mode: 'read'
        };
    }

    updateTimestamp = (timestamp) => {

        this.setState({
            timestamp: timestamp
        });
    };

    editBirth() {
        this.setState({
            mode: 'edition'
        });
    }

    saveBirth() {
        this.setState({
            mode: 'read'
        });
        const { lang } = this.props;
        const { city, name, weight, size, text, textEn, timestamp } = this.state;
        fbEditBirth({
            'city': city,
            'name': name,
            'size': size,
            'text': text,
            'textEn': textEn,
            'textEn': textEn,
            'timestamp': timestamp,
            'weight': weight
        });
        toast.success(<Trad lang={lang} code={'birth.toast.save.success'}/>);
    }

    render() {

        const { lang, isAdmin } = this.props;
        const { city, name, weight, size, text, textEn, timestamp } = this.state;
        return (
            <React.Fragment>
                {
                    this.state.mode === 'edition'
                        ? <article className="birth birth--edition">
                            <img className="birth__icon" src={birthIcon} alt="Icon of baby. His clothes are blue because it's a boy" />
                            <div className="birth__content">
                                <Time time={timestamp} mode={this.state.mode} getTimestamp={this.updateTimestamp} />
                                <p className="tile__geolocalisation">{GeolocalisationIcon}<input placeholder="Ville" type="text" value={city ? city : ''} onChange={e => this.setState({ city: e.target.value})} /></p>
                                <p className="birth__name">Je m'appelle <input placeholder="Prénom(s)" type="text" value={name} onChange={e => this.setState({ name: e.target.value})} /></p>
                                <p className="birth__weight"><input type="text" value={weight} onChange={e => this.setState({ weight: e.target.value})} /><span className="birth__weight__unit">kg</span></p>
                                <p className="birth__size"><input type="text" value={size} onChange={e => this.setState({ size: e.target.value})} /><span className="birth__weight__unit">cm</span></p>
                                <p className="birth__text"><textarea placeholder="[FR] petite phrase en surplus (facultative)" type="text" value={text} onChange={e => this.setState({ text: e.target.value})} /></p>
                                <p className="birth__text"><textarea placeholder="[EN] little extra sentence (optional)" type="text" value={textEn} onChange={e => this.setState({ textEn: e.target.value})} /></p>
                                {
                                    isAdmin
                                        ?   <div className="birth__manage">
                                                <button onClick={(e) => this.saveBirth(e)}><img src={saveIcon} /></button>
                                            </div>
                                        : null
                                }
                            </div>
                        </article>
                        : <article className="birth">
                            <img className="birth__icon" src={birthIcon} alt="Icon of baby. His clothes are blue because it's a boy" />
                            <div className="birth__content">
                                <Time lang={lang} time={timestamp} />
                                <p className="birth__geolocalisation">{GeolocalisationIcon}{city}</p>
                                <p className="birth__name"><Trad lang={lang} code={'birth.name'}/> {name}</p>
                                <p className="birth__weight">{weight}<span className="birth__weight__unit">kg</span></p>
                                <p className="birth__size">{size}<span className="birth__weight__unit">cm</span></p>
                                {
                                    lang === 'fr-FR' && text
                                        ? <p className="birth__text">{text}</p>
                                        : null
                                }
                                {
                                    lang === 'en-EN' && textEn
                                        ? <p className="birth__text">{textEn}</p>
                                        : null
                                }
                                {
                                    isAdmin
                                        ?   <div className="birth__manage">
                                                <button onClick={(e) => this.editBirth(e)}><img src={editIcon} /></button>
                                            </div>
                                        : null
                                }
                            </div>
                        </article>
                }
            </React.Fragment>
        );
    }
}
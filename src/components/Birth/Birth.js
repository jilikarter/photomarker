import React, { Component } from 'react';

import birthIcon from '../../assets/images/baby.svg';
import editIcon from '../../assets/images/edit.svg';
import saveIcon from '../../assets/images/save.svg';
import {GeolocalisationIcon} from "../GeolocalisationIcon/GeolocalisationIcon";
import {Time} from "../Time/Time";

import './Birth.css';
import { fbEditBirth } from "../../services/Firebase";
import { toast } from 'react-toastify';

export class Birth extends Component {

    constructor(props) {
        super(props);

        const { city, name, weight, size, text, timestamp } = this.props.datas;
        this.state = {
            city: city,
            name: name,
            size: size,
            weight: weight,
            text: text,
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
        const { city, name, weight, size, text, timestamp } = this.state;
        fbEditBirth({
            'city': city,
            'name': name,
            'size': size,
            'text': text,
            'timestamp': timestamp,
            'weight': weight
        });
        toast.success('Les données ont bien été mise à jour');
    }

    render() {

        const { isAdmin } = this.props;
        const { city, name, weight, size, text, timestamp } = this.state;

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
                                <p className="birth__text"><textarea placeholder="petite phrase en surplus (facultative)" type="text" value={text} onChange={e => this.setState({ text: e.target.value})} /></p>
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
                                <Time time={timestamp}/>
                                <p className="birth__geolocalisation">{GeolocalisationIcon}{city}</p>
                                <p className="birth__name">Je m'appelle {name}</p>
                                <p className="birth__weight">{weight}<span className="birth__weight__unit">kg</span></p>
                                <p className="birth__size">{size}<span className="birth__weight__unit">cm</span></p>
                                {
                                    text
                                        ? <p className="birth__text">{text}</p>
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
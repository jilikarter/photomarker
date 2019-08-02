import React, { Component } from 'react';

import { GeolocalisationIcon } from '../GeolocalisationIcon/GeolocalisationIcon';
import { Time } from "../Time/Time";

import './TileShadow.css';

export class TileShadow extends Component {

    render() {

        return (
            <React.Fragment>
                <article className="tile-shadow">
                    <Time time={Date.now()}/>
                    <p className="tile-shadow__geolocalisation">{GeolocalisationIcon}</p>
                    <figure className="tile-shadow__picture">
                    </figure>
                </article>
            </React.Fragment>
        );
    }
}
import React, { Component } from 'react';

import { GeolocalisationIcon } from '../GeolocalisationIcon/GeolocalisationIcon';

import './Tile.css';
import {Time} from "../Time/Time";

export class Tile extends Component {

    state = {

    };


    render() {
        const { datas, isAdmin } = this.props;
        const imageURL = datas.picture;
        return (
            <React.Fragment>
                <article className={isAdmin ? "tile tile--admin" : "tile"}>
                    <Time time={datas.timestamp}/>
                    {
                        datas.city
                        ? <p className="tile__geolocalisation">{GeolocalisationIcon}{datas.city}</p>
                        : null
                    }
                    <figure className="tile__picture">
                        <img alt="little think" title="" src={imageURL} />
                    </figure>
                    <p className="tile__text">{datas.text}</p>
                    {
                        isAdmin
                        ?   <div className="tile__manage">
                                <button>edit</button>
                                <button>delete</button>
                            </div>
                        : null
                    }
                </article>
            </React.Fragment>
        );
    }
}
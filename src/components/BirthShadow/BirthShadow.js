import React, { Component } from 'react';

import birthIcon from '../../assets/images/baby.svg';
import { Time } from "../Time/Time";

import './BirthShadow.css';

export class BirthShadow extends Component {

    render() {

        return (
            <React.Fragment>
                <article className="birth-shadow">
                    <img className="birth-shadow__icon" src={birthIcon} alt="Icon of baby. His clothes are blue because it's a boy" />
                    <div className="birth-shadow__content">
                        <Time time={Date.now()}/>
                        <p className="birth-shadow__name"></p>
                        <p className="birth-shadow__weight"><span className="birth-shadow__weight__unit">kg</span></p>
                        <p className="birth-shadow__size"><span className="birth-shadow__weight__unit">cm</span></p>
                    </div>
                </article>
            </React.Fragment>
        );
    }
}
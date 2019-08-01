import React, { Component } from 'react';

import birthIcon from '../../assets/images/baby.svg';
import {Time} from "../Time/Time";

import './Birth.css';
import { getBirth } from "../../services/Firebase";

export class Birth extends Component {

    state = {
        birth: []
    };

    componentDidMount() {

        const birth = getBirth();

        this.setState({
            birth
        });
    }



    render() {

        const births = this.state.birth;
        let birth = {};
        births.map( item  => (
            birth = item
        ))

        return (
            <React.Fragment>
                <article className="birth">
                    <img className="birth__icon" src={birthIcon} alt="Icon of baby. His clothes are blue because it's a boy" />
                    <div className="birth__content">
                        <Time time={birth.timestamp}/>
                        <p className="birth__name">Je m'appelle E....</p>
                        <p className="birth__weight">{birth.weight}<span className="birth__weight__unit">kg</span></p>
                        <p className="birth__size">{birth.size}<span className="birth__weight__unit">cm</span></p>
                        {
                            birth.text
                            ? <p className="birth__text">{birth.text}</p>
                            : null
                        }
                    </div>
                </article>
            </React.Fragment>
        );
    }
}
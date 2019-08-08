import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firebase} from "../../firebase";

import moment from "moment/moment";
import 'moment/locale/fr';

import './Menu.css';
import {Trad} from "../Trad/Trad";

export class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paramsActive: false,
            user: null
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {

            if(null !== user) {

                moment.locale();
                const date = moment(user.metadata.lastSignInTime);

                let username = user.email;
                if(null !== user.displayName) {
                    username = user.displayName;
                }
                this.setState({
                    user: user,
                    username: username,
                    lastConnected: date.format('DD/MM/YYYY [à] HH:mm:ss')
                });
            }
        });
    }

    closeParams() {
        const { paramsActive } = this.state;
        setTimeout(() => {

            this.setState({paramsActive: !paramsActive});
        }, 200);
    }

    render() {

        const { username, lastConnected, paramsActive } = this.state;
        const { signOut, lang } = this.props;
        return (
            <nav className="menu">
                <p className="menu__username">{username}</p>
                <p className="menu__last-connected"><Trad lang={lang} code={'menu.lastConnected'}/> : {lastConnected}</p>
                <button className={`menu__params-button${paramsActive ? ' menu__params-button--active': ''}`} onClick={() => this.setState({paramsActive: !paramsActive})} onBlur={() => this.closeParams()}>Paramètres</button>
                <section className="menu__params-container">
                    <Link className="menu__params-container__item" to='/edit-profile' ><Trad lang={lang} code={'menu.profile'}/></Link>
                    <button className="menu__params-container__item" onClick={() => signOut()}><Trad lang={lang} code={'menu.signOut'}/></button>
                </section>
            </nav>
        );
    }
}
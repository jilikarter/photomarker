import React, { Component } from 'react';
import { Form } from '../../components/Form/Form';
import { Home } from "../Home/Home";

import { VISITOR_ACCESS, ADMIN_ACCESS } from "../../env";

import './Login.css';

export class Login extends Component {

    state = {
        passwordGuest: VISITOR_ACCESS,
        passwordAdmin: ADMIN_ACCESS,
        authorized: false,
        isAdmin: false,
        currentPassword: ''
    };

    handleLogin() {
        const { currentPassword, passwordGuest, passwordAdmin } = this.state;

        if(currentPassword === passwordGuest) {
            this.setState({
                authorized: true,
                isAdmin: false
            });
        } else if(currentPassword === passwordAdmin) {
            this.setState({
                authorized: true,
                isAdmin: true
            });
        }
    }

    handleChange(e) {
        this.setState({
            currentPassword: e.target.value
        });
    }


    render() {
        const { authorized, isAdmin } = this.state;
        return (
            <React.Fragment>
                {authorized
                    ? <Home isAdmin={isAdmin} />
                    : (
                        <section className="login">
                            <h1 className="login__title">Connectez vous</h1>
                            <p className="login__explain">Veuillez rentrer ci-dessous le mot de passe qui vous a été fourni avec l'adresse du site</p>
                            <input className="login__password" placeholder="mot de passe (password)" name="password" onChange={e => this.handleChange(e) } type="password"/>
                            <button className="login__button" onClick={e => this.handleLogin() }>Accéder</button>
                        </section>
                    )
                }
                {isAdmin
                    ? (
                        <Form />
                    )
                    : null
                }
            </React.Fragment>
        );
    }
}
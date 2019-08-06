import React, { Component } from 'react';
import { Home } from "../Home/Home";

import { VISITOR_ACCESS, ADMIN_ACCESS } from "../../env";

import './Login.css';

export class Login extends Component {

    state = {
        passwordGuest: VISITOR_ACCESS,
        passwordAdmin: ADMIN_ACCESS,
        authorized: false,
        isAdmin: false,
        error: false,
        currentPassword: ''
    };

    handleLogin(e) {
        e.preventDefault();
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
        } else {
            this.setState({
                error: true
            });
        }
    }

    handleChange(e) {
        this.setState({
            currentPassword: e.target.value
        });
    }


    render() {
        const { authorized, isAdmin, error } = this.state;
        return (
            <React.Fragment>
                {authorized
                    ? <Home isAdmin={isAdmin} />
                    : (
                        <form className="login" onSubmit={(e) => this.handleLogin(e)}>
                            <h1 className="login__title">Connectez vous</h1>
                            <p className="login__explain">Veuillez rentrer ci-dessous le mot de passe qui vous a été fourni avec l'adresse du site</p>
                            <input className={`login__password${error ? ' login__password--error' : ''}`} autoFocus={true} placeholder="mot de passe (password)" name="password" onChange={e => this.handleChange(e) } type="password"/>
                            {
                                error
                                ? <p className="login__error-message">Le mot de passe saisi n'est pas correct. En cas d'oubli ou perte de mot de passe, veuillez vous rapprochez de la personne qui vous l'a fourni.</p>
                                : null
                            }
                            <button className="login__button">Accéder</button>
                        </form>
                    )
                }
            </React.Fragment>
        );
    }
}
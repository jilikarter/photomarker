import React, { Component } from 'react';
import { Form } from '../../components/Form/Form';
import { Home } from "../Home/Home";

import { VISITOR_ACCESS, ADMIN_ACCESS } from "../../env";

export class Login extends Component {

    state = {
        passwordGuest: VISITOR_ACCESS,
        passwordAdmin: ADMIN_ACCESS,
        authorized: false,
        isAdmin: false,
        currentPassword: ''
    };

    handleLogin(e) {
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
                        <React.Fragment>
                            <h1>Login</h1>
                            <input name="password" onChange={e => this.handleChange(e) } type="password"/>
                            <button onClick={e => this.handleLogin(e) }>Accéder</button>
                        </React.Fragment>
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
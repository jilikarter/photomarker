import React, { Component } from 'react';

import { fbCreateAccount, fbVerifyMail } from "../../services/Firebase";
import { toast } from 'react-toastify';
import {Trad} from "../../components/Trad/Trad";

import './SignIn.css';

export class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorSignIn: false,
            username: '',
            email: '',
            password: ''
        };
    }

    async createAccount(e) {
        e.preventDefault();

        const { lang } = this.props;
        const { email, password, username } = this.state;
        if(email !== '' && password !== '') {

            try {

                const result = await fbCreateAccount(email, password);
                if(result.user) {

                    if(username) {
                        await result.user.updateProfile({
                            displayName: username
                        }).catch(function(error) {
                            toast.error(<Trad lang={lang} code={'signIn.toast.updateUsername'}/>);
                        });
                    }

                    fbVerifyMail();
                    toast.info(<Trad lang={lang} code={'signIn.toast.confirmEmail'}/>);
                } else {

                    switch (result.code) {
                        case "auth/email-already-in-use":
                            toast.error(<Trad lang={lang} code={'signIn.toast.emailAlreadyUsed'}/>);
                            break;
                        case "auth/weak-password":
                            toast.error(<Trad lang={lang} code={'signIn.toast.weakPassword'}/>);
                            break;

                        default :
                            toast.error(<Trad lang={lang} code={'signIn.toast.default'}/>);
                            break;
                    }
                }
            } catch (e) {
                switch (e.code) {
                    case "auth/email-already-in-use":
                        toast.error(<Trad lang={lang} code={'signIn.toast.emailAlreadyUsed'}/>);
                        break;
                    case "auth/weak-password":
                        toast.error(<Trad lang={lang} code={'signIn.toast.weakPassword'}/>);
                        break;

                    default :
                        toast.error(<Trad lang={lang} code={'signIn.toast.default'}/>);
                        break;
                }
            }
        } else {
            toast.warn(<Trad lang={lang} code={'signIn.toast.empty'}/>);
        }
    }

    render() {

        const { lang } = this.props;
        const { errorSignIn, username, email, password } = this.state;
        return (
            <React.Fragment>
                <h1><Trad lang={lang} code={'signIn.title'}/></h1>
                <form className="sign-in" onSubmit={(e) => this.createAccount(e)}>
                    <label className="sign-in__label" htmlFor="username"><Trad lang={lang} code={'signIn.pseudo.label'}/></label>
                    <input className={`sign-in__input${errorSignIn ? ' sign-in__input--error' : ''}`} id="username" name="username" onChange={(e) => this.setState({username: e.target.value})} value={username} type="text"/>

                    <label className="sign-in__label sign-in__label--required" htmlFor="email"><Trad lang={lang} code={'signIn.email.label'}/></label>
                    <input className={`sign-in__input${errorSignIn ? ' sign-in__input--error' : ''}`} placeholder="xxxxxx@xxx.xx" id="email" name="email" onChange={(e) => this.setState({email: e.target.value})} value={email} type="email"/>

                    <label className="sign-in__label sign-in__label--required" htmlFor="password"><Trad lang={lang} code={'signIn.password.label'}/></label>
                    <input className={`sign-in__input${errorSignIn ? ' sign-in__input--error' : ''}`} placeholder="xxxxxxxxxx" id="password" name="password" onChange={(e) => this.setState({password: e.target.value})} value={password} type="password"/>

                    <p className="sign-in__explain"><Trad lang={lang} code={'signIn.info'}/></p>
                    <button className="sign-in__button"><Trad lang={lang} code={'signIn.submit'}/></button>
                </form>
            </React.Fragment>
        );
    }
}
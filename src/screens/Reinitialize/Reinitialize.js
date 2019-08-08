import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import {fbReinitializePassword} from "../../services/Firebase";
import { ToastContainer, toast } from 'react-toastify';
import {Trad} from "../../components/Trad/Trad";
import {Lang} from "../../components/Lang/Lang";

import 'react-toastify/dist/ReactToastify.css';
import './Reinitialize.css';

export class Reinitialize extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            errorSignIn: false,
            email: ''
        };
    }

    reinitializePassword(e) {
        e.preventDefault();

        const { lang } = this.props;
        const { email } = this.state;
        if(email) {

            try {

                const result = fbReinitializePassword(email);
                toast.info(<Trad lang={lang} code={'reinitialize.toast.mailSend'}/>);
                this.setState({
                    redirect: true
                });
            } catch (e) {
                console.log(e.code);
                switch (e.code) {
                    case 'auth/invalid-email':
                        toast.error(<Trad lang={lang} code={'reinitialize.toast.invalidEmail'}/>);
                        break;
                    case 'auth/user-not-found':
                        toast.error(<Trad lang={lang} code={'reinitialize.toast.userNotFound'}/>);
                        break;
                    default :
                        toast.error(<Trad lang={lang} code={'reinitialize.toast.default'}/>);
                        break;
                }
            }
        } else {
            toast.error(<Trad lang={lang} code={'reinitialize.toast.empty'}/>);
        }
    }

    changeLanguage = (lang) => {

        const { changeLanguage } = this.props;
        changeLanguage(lang);
    };

    render() {

        const { lang } = this.props;
        const { redirect, email } = this.state;
        return (
            <React.Fragment>
                {
                    redirect
                        ? <Link to='/' className="reinitialize__button"><Trad lang={lang} code={'reinitialize.goBack'}/></Link>
                        : <React.Fragment>
                            <h1><Trad lang={lang} code={'reinitialize.title'}/></h1>
                            <form className="reinitialize" onSubmit={(e) => this.reinitializePassword(e)}>
                                <input className="reinitialize__input" placeholder="email" name="email" onChange={(e) => this.setState({email: e.target.value})} value={email} type="email"/>
                                <button className="reinitialize__button"><Trad lang={lang} code={'reinitialize.submit'}/></button>
                                <Link to='/' className="reinitialize__button"><Trad lang={lang} code={'reinitialize.return'}/></Link>
                            </form>
                        </React.Fragment>
                }
                <Lang lang={lang} changeLanguage={this.changeLanguage} />
                <ToastContainer />
            </React.Fragment>
        );
    }
}
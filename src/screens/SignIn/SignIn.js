import React, { Component } from 'react';

import './SignIn.css';
import { fbCreateAccount, fbVerifyMail } from "../../services/Firebase";
import { toast } from 'react-toastify';

export class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorSignIn: false,
            email: '',
            password: ''
        };
    }

    async createAccount(e) {
        e.preventDefault();

        const { email, password } = this.state;
        if(email !== '' && password !== '') {

            try {

                const { email, password } = this.state;
                const result = await fbCreateAccount(email, password);
                if(result.user) {

                    fbVerifyMail();
                    toast.info('Votre compte a bien été crée. Un mail vous a été envoyé pour la validation du compte, veuillez cliquer sur le lien dans l\'email.');
                } else {

                    switch (result.code) {
                        case "auth/email-already-in-use":
                            toast.error('Un compte existe déjà avec cette adresse email');
                            break;
                        case "auth/weak-password":
                            toast.error('Le mot de passe est trop court (6 caractères minimum)');
                            break;

                        default :
                            toast.error('Une erreur dans la création de compte est survenue, veuillez contacter le responsable du site : code error 3');
                            break;
                    }
                }
            } catch (e) {
                switch (e.code) {
                    case "auth/email-already-in-use":
                        toast.error('Un compte existe déjà avec cette adresse email');
                        break;
                    case "auth/weak-password":
                        toast.error('Le mot de passe est trop court (6 caractères minimum)');
                        break;

                    default :
                        toast.error('Une erreur dans la création de compte est survenue, veuillez contacter le responsable du site : code error 3');
                        break;
                }
            }
        } else {
            toast.warn('veuillez remplir tous les champs');
        }
    }

    render() {

        const { errorSignIn, email, password } = this.state;
        return (
            <React.Fragment>
                <h1>Je crée mon compte</h1>
                <form className="login" onSubmit={(e) => this.createAccount(e)}>
                    <input className={`login__input${errorSignIn ? ' login__input--error' : ''}`} placeholder="email" name="email" onChange={(e) => this.setState({email: e.target.value})} value={email} type="email"/>
                    <input className={`login__input${errorSignIn ? ' login__input--error' : ''}`} placeholder="mot de passe (password)" name="password" onChange={(e) => this.setState({password: e.target.value})} value={password} type="text"/>
                    <button className="login__button">Créer</button>
                </form>
            </React.Fragment>
        );
    }
}
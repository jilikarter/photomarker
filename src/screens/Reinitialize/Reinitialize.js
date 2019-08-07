import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import {fbReinitializePassword} from "../../services/Firebase";
import { ToastContainer, toast } from 'react-toastify';

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
        const { email } = this.state;
        if(email) {

            try {

                const result = fbReinitializePassword(email);
                toast.info('Un email vous a été envoyé');
                this.setState({
                    redirect: true
                });
            } catch (e) {
                console.log(e.code);
                switch (e.code) {
                    case 'auth/invalid-email':
                        toast.error('Le format du mail est invalide');
                        break;
                    case 'auth/user-not-found':
                        toast.error('L\'email ne correspond a aucun compte');
                        break;
                    default :
                        toast.error('Une erreur est survenue lors de la tentative. Veuillez contacter le responsable du site : code erreur 4');
                        break;
                }
            }
        } else {
            toast.error('Le champ est vide');
        }
    }

    render() {

        const { redirect, email } = this.state;
        return (
            <React.Fragment>
                {
                    redirect
                        ? <Link to='/' className="reinitialize__button">Revenir à l'accueil</Link>
                        : <React.Fragment>
                            <h1>Réinitialisation du mot de passe</h1>
                            <form className="reinitialize" onSubmit={(e) => this.reinitializePassword(e)}>
                                <input className="reinitialize__input" placeholder="email" name="email" onChange={(e) => this.setState({email: e.target.value})} value={email} type="email"/>
                                <button className="reinitialize__button">Réinitialiser</button>
                                <Link to='/' className="reinitialize__button">Retour</Link>
                            </form>
                        </React.Fragment>
                }
                <ToastContainer />
            </React.Fragment>
        );
    }
}
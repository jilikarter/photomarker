import React, { Component } from 'react';
import { Home } from "../Home/Home";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { VISITOR_ACCESS, ADMIN_ACCESS, ADMIN_LOGIN } from "../../env";

import './Login.css';
import {SignIn} from "../SignIn/SignIn";
import { fbSignIn, fbSignOut } from "../../services/Firebase";
import {firebase} from "../../firebase";

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accessTemporary: false,
            passwordGuest: VISITOR_ACCESS,
            passwordAdmin: ADMIN_ACCESS,
            authorized: false,
            signIn: false,
            isAdmin: false,
            errorRegister: false,
            errorSignIn: false,
            currentPassword: '',
            email: '',
            password: ''
        };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {

            if(null !== user) {

                this.setState({
                    authorized: true,
                    signIn: true
                });
                if(user.email === ADMIN_LOGIN) {
                    this.setState({
                        isAdmin: true
                    });
                }
            } else {
                // toast.info('Votre session a expiré, veuillez vous reconnecter');
            }
        });
    }

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
                isAdmin: true,
                accessTemporary: true
            });
        } else {
            this.setState({
                errorRegister: true
            });
        }
    }

    async handleSignIn(e) {
        e.preventDefault();

        const { email, password } = this.state;
        this.setState({
            errorSignIn: false
        });

        if(email && password) {

            try {

                const result = await fbSignIn(email, password);
                if(typeof result !== 'undefined') {
                    this.setState({
                        authorized: true,
                        signIn: true
                    });

                    if(result.user.email === ADMIN_LOGIN) {
                        this.setState({
                            isAdmin: true
                        });
                    }
                }
            } catch (e) {
                this.setState({
                    errorSignIn: true
                });
                toast.error('L\'email et/ou le password sont incorrects');
            }
        } else {
            toast.warn('Les champs doivent être remplis');
        }
    }

    signOut() {
        this.setState({
            authorized: false,
            signIn: false
        });
        fbSignOut();
        toast.info('Vous avez bien été déconnecté');
    }


    render() {

        const { authorized, isAdmin, errorRegister, errorSignIn, email, password, signIn, accessTemporary } = this.state;
        return (
            <React.Fragment>
                {!authorized
                    ? (
                        <React.Fragment>
                            <form className="login" onSubmit={(e) => this.handleSignIn(e)}>
                                <h1 className="login__title">Connectez vous</h1>
                                <p className="login__explain">Veuillez rentrer ci-dessous le mot de passe qui vous a été fourni avec l'adresse du site</p>
                                <input className={`login__input${errorSignIn ? ' login__input--error' : ''}`} placeholder="email" name="email" onChange={(e) => this.setState({email: e.target.value})} value={email} type="email"/>
                                <input className={`login__input${errorSignIn ? ' login__input--error' : ''}`} placeholder="mot de passe (password)" name="password" onChange={(e) => this.setState({password: e.target.value})} value={password} type="password"/>
                                {
                                    errorSignIn
                                        ? <p className="login__error-message">Le mot de passe et/ou saisi n'est pas correct. En cas d'oubli ou perte de mot de passe, vous pouvez réinitialiser le mot de passe en <Link to="/reinitialize" >cliquant ici</Link>.</p>
                                        : null
                                }
                                <button className="login__button">Accéder</button>
                            </form>
                            <span className="login__separator">Ou</span>
                            <form className="login" onSubmit={(e) => this.handleLogin(e)}>
                                <h1 className="login__title">Enregistrez vous</h1>
                                <p className="login__explain">Veuillez rentrer ci-dessous le mot de passe qui vous a été fourni avec l'adresse du site</p>
                                <input className={`login__input${errorRegister ? ' login__input--error' : ''}`} autoFocus={true} placeholder="mot de passe (password)" name="password" onChange={(e) => this.setState({currentPassword: e.target.value})} value={this.state.currentPassword} type="password"/>
                                {
                                    errorRegister
                                        ? <p className="login__error-message">Le mot de passe saisi n'est pas correct. En cas d'oubli ou perte de mot de passe, veuillez vous rapprochez de la personne qui vous l'a fourni.</p>
                                        : null
                                }
                                <button className="login__button">Créer son compte</button>
                            </form>
                        </React.Fragment>
                    )
                    : (signIn || isAdmin
                        ? <React.Fragment>
                            <Home isAdmin={isAdmin} />
                            {
                                !accessTemporary
                                ? <button className="login__log-out" onClick={(e) => this.signOut()}>Log out</button>
                                : null
                            }
                        </React.Fragment>
                        : <SignIn />
                    )
                }
                <ToastContainer />
            </React.Fragment>
        );
    }
}
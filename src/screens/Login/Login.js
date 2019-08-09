import React, { Component } from 'react';
import { Home } from "../Home/Home";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SignIn} from "../SignIn/SignIn";
import { fbSignIn, fbSignOut } from "../../services/Firebase";
import {firebase} from "../../firebase";
import {Lang} from "../../components/Lang/Lang";
import {Trad} from "../../components/Trad/Trad";

import moment from "moment/moment";
import 'moment/locale/fr';

import { VISITOR_ACCESS, ADMIN_ACCESS, ADMIN_LOGIN } from "../../env";

import './Login.css';

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
            password: '',
            username: null
        };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {

            if(null !== user) {

                moment.locale();
                const date = moment(user.metadata.lastSignInTime);

                this.setState({
                    authorized: true,
                    signIn: true,
                    username: user.email,
                    lastConnected: date.format('DD/MM/YYYY [à] HH:mm:ss')
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

        const { lang, email, password } = this.state;
        this.setState({
            errorSignIn: false
        });

        if(email && password) {

            try {

                const result = await fbSignIn(email, password);
                if(typeof result !== 'undefined') {

                    if(result.user.emailVerified) {

                        moment.locale();
                        const date = moment(result.user.metadata.lastSignInTime);
                        this.setState({
                            authorized: true,
                            signIn: true,
                            username: result.user.email,
                            lastConnected: date.format('DD/MM/YYYY [à] HH:mm:ss')
                        });

                        if(result.user.email === ADMIN_LOGIN) {
                            this.setState({
                                isAdmin: true
                            });
                        }
                    } else {
                        this.setState({
                            authorized: false,
                            signIn: false
                        });
                        toast.warn(<Trad lang={lang} code={'login.toast.confirmEmail'}/>);
                        fbSignOut();
                    }
                }
            } catch (e) {

                switch (e.code) {
                    case 'auth/user-not-found':
                        toast.error(<Trad lang={lang} code={'login.toast.userNotFound'}/>);
                        break;
                    case 'auth/wrong-password':
                        toast.error(<Trad lang={lang} code={'login.toast.wrongPassword'}/>);
                        break;
                    case 'auth/user-disabled':
                        toast.info(<Trad lang={lang} code={'login.toast.userDisabled'}/>);
                        break;
                    default:
                        toast.error(<Trad lang={lang} code={'login.toast.default'}/>);

                }
                this.setState({
                    errorSignIn: true
                });
            }
        } else {

            toast.warn(<Trad lang={lang} code={'login.toast.empty'}/>);
        }
    }

    signOut = () => {
        const { lang } = this.props;
        this.setState({
            authorized: false,
            signIn: false
        });
        fbSignOut();
        toast.success(<Trad lang={lang} code={'login.toast.signOut'}/>);
    };

    changeLanguage = (lang) => {

        const { changeLanguage } = this.props;
        changeLanguage(lang);
    };


    render() {

        const { lang } = this.props;
        const { authorized, isAdmin, errorRegister, errorSignIn, email, password, signIn, accessTemporary } = this.state;
        return (
            <React.Fragment>
                {!authorized
                    ? (
                        <React.Fragment>
                            <form className="login" onSubmit={(e) => this.handleSignIn(e)}>
                                <h1 className="login__title"><Trad lang={lang} code={'login.connection.title'}/></h1>
                                <input className={`login__input${errorSignIn ? ' login__input--error' : ''}`} placeholder="email" name="email" onChange={(e) => this.setState({email: e.target.value})} value={email} type="email"/>
                                <input className={`login__input${errorSignIn ? ' login__input--error' : ''}`} placeholder="password (mot de passe)" name="password" onChange={(e) => this.setState({password: e.target.value})} value={password} type="password"/>
                                {
                                    errorSignIn
                                        ?   <React.Fragment>
                                                <p className="login__error-message"><Trad lang={lang} code={'login.connection.error-message'}/></p>
                                                <Link to="/reinitialize"><Trad lang={lang} code={'login.connection.reset-link'}/></Link>
                                            </React.Fragment>
                                        : null
                                }
                                <button className="login__button"><Trad lang={lang} code={'login.connection.submit'}/></button>
                            </form>
                            <span className="login__separator"><Trad lang={lang} code={'login.connection.separator'}/></span>
                            <form className="login" onSubmit={(e) => this.handleLogin(e)}>
                                <h1 className="login__title"><Trad lang={lang} code={'login.register.title'}/></h1>
                                <p className="login__explain"><Trad lang={lang} code={'login.register.explain'}/></p>
                                <input className={`login__input${errorRegister ? ' login__input--error' : ''}`} placeholder="password (mot de passe)" name="password" onChange={(e) => this.setState({currentPassword: e.target.value})} value={this.state.currentPassword} type="password"/>
                                {
                                    errorRegister
                                        ? <p className="login__error-message"><Trad lang={lang} code={'login.register.error-message'}/></p>
                                        : null
                                }
                                <button className="login__button"><Trad lang={lang} code={'login.register.submit'}/></button>
                            </form>
                        </React.Fragment>
                    )
                    : (signIn || isAdmin
                        ? <Home lang={lang} isAdmin={isAdmin} accessTemporary={accessTemporary} signOut={this.signOut} />
                        : <SignIn lang={lang} />
                    )
                }
                <Lang lang={lang} changeLanguage={this.changeLanguage} />
                <ToastContainer />
            </React.Fragment>
        );
    }
}
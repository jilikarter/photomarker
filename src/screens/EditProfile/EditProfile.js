import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firebase} from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import {Lang} from "../../components/Lang/Lang";
import moment from "moment/moment";
import {Trad} from "../../components/Trad/Trad";

import 'react-toastify/dist/ReactToastify.css';
import './EditProfile.css';

export class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            language: 'fr',
            name: '',
            email: null,
            lastConnected: null
        };
    }

    save() {

        const { lang } = this.props;
        const { name, language } = this.state;
        const user = firebase.auth().currentUser;
        user.languageCode = language;
        user.updateProfile({
            displayName: name,
            language: language
        }).then(function() {
            toast.success(<Trad lang={lang} code={'editProfile.toast.success'}/>);
        }).catch(function(error) {
            toast.error(<Trad lang={lang} code={'editProfile.toast.error'}/>);
        });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {

            if(null !== user) {

                console.log(user);
                moment.locale();
                const date = moment(user.metadata.lastSignInTime);

                this.setState({
                    user: user,
                    name: user.displayName === null ? '' : user.displayName,
                    email: user.email,
                    lastConnected: date.format('DD/MM/YYYY [à] HH:MM:SS')
                });
            } else {

                window.location.href = '/';
            }
        });
    }

    changeLanguage = (lang) => {

        const { changeLanguage } = this.props;
        changeLanguage(lang);
    };

    render() {

        const { lang } = this.props;
        const { user, name } = this.state;
        return (
            <React.Fragment>
                {
                    user
                    ?   <section className="edit">
                            <h1 className="edit__title"><Trad lang={lang} code={'editProfile.title'}/></h1>
                            <input className="edit__input" type="text" value={name} onChange={(e) => this.setState({name: e.target.value})} placeholder="Votre pseudo" />
                            <button className="edit__button" onClick={() => this.save()}><Trad lang={lang} code={'editProfile.submit'}/></button>
                            <Link className="edit__button" to={'/'}><Trad lang={lang} code={'editProfile.return'}/></Link>
                            <ToastContainer />
                        </section>
                    : null
                }
                <Lang lang={lang} changeLanguage={this.changeLanguage} />
            </React.Fragment>
        );
    }
}
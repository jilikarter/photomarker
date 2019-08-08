import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firebase} from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './EditProfile.css';
import moment from "moment/moment";

export class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            name: '',
            email: null,
            lastConnected: null
        };
    }

    save() {

        const { name } = this.state;
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function() {
            toast.success('Votre profil a bien été mis à jour');
        }).catch(function(error) {
            toast.error('Une erreur est survenue lors de l\'enregistrement, veuillez contacter le responsable du site : code erreur 6');
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

    render() {

        const { user, name } = this.state;
        return (
            <React.Fragment>
                {
                    user
                    ?   <section className="edit">
                            <h1 className="edit__title">Edition du profil</h1>
                            <input className="edit__input" type="text" value={name} onChange={(e) => this.setState({name: e.target.value})} placeholder="Votre pseudo" />
                            <button className="edit__button" onClick={() => this.save()}>Sauvegarder</button>
                            <Link className="edit__button" to={'/'}>Retour</Link>
                            <ToastContainer />
                        </section>
                    : null
                }
            </React.Fragment>
        );
    }
}
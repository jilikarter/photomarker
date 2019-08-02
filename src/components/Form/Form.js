import React, { Component } from 'react';
import {InputFile} from "../InputFIle/InputFile";
import { addArticle } from "../../services/Firebase";

import moment from 'moment';
import 'moment/locale/fr';

import './Form.css';

export class Form extends Component {

    state = {
        id: null,
        title: '',
        timestamp: null,
        geolocalisation: false,
        city: null,
        picture: null,
        text: '',
        disposition: 'default'
    };

    getPicture = (file) => {

        const now = Date.now();
        this.encodeImageFileAsURL(file);
        this.setState({
            id: moment().format('YYYYMMDDHHmm'),
            timestamp: now
        });

        //Generate ID

    }

    encodeImageFileAsURL(file) {

        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                picture: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    async register() {

        if(this.isAddAvailable()) {

            //Case if the user want the geolocalisation
            if(this.state.geolocalisation) {

                await addArticle({
                    id: this.state.id,
                    title: this.state.title,
                    timestamp: this.state.timestamp,
                    picture: this.state.picture,
                    text: this.state.text,
                    disposition: this.state.disposition,
                    city: this.state.city
                });
            } else {
                await addArticle({
                    id: this.state.id,
                    title: this.state.title,
                    timestamp: this.state.timestamp,
                    picture: this.state.picture,
                    text: this.state.text,
                    disposition: this.state.disposition,
                    city: null
                });
            }
        } else {
            console.log('not fill completed');
        }
    }

    isAddAvailable() {

        return (this.state.timestamp !== null && this.state.picture !== null && this.state.id !== null && this.state.title !== ''); //&& this.state.text !== null
    }

    getGeolocalisation() {

        const self = this;
        if(this.state.geolocalisation === false) {

            this.setState({
                geolocalisation: true
            });
            if(this.state.city === null) {
                let xhttp = new XMLHttpRequest();
                xhttp.responseType = "json";
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        self.setCity(this.response.city);
                    }
                    if(this.status === 429) {
                        console.log("trop de demandes");
                    }
                };
                xhttp.open("GET", "https://ipinfo.io/json?token=d5a41ded8156de", true);
                xhttp.send();
            }
        } else {
            this.setState({
                geolocalisation: false
            });
        }
    }

    setCity(city) {

        this.setState({
            city: city
        });
    }

    render() {
        return (
            <section className="add-form">
                <input type="checkbox" id="add-button" />
                <label className="add-form__add-button" htmlFor="add-button"></label>
                <div className="add-form__content">
                    <input className="add-form__content__title" placeholder="titre (obligatoire et sans espaces)" type="text" value={this.state.title} onChange={e => this.setState({ title: e.target.value})} />
                    <InputFile name="file" id="file" getImage={this.getPicture} />
                    <textarea className="add-form__content__text" name="text" id="text" value={this.state.text} onChange={e => this.setState({ text: e.target.value})} placeholder="Ajout du texte ici"></textarea>
                    <p className="add-form__geolocalisation" htmlFor="geolocalisation" onClick={() => this.getGeolocalisation()}>
                        {
                            (this.state.city === null || !this.state.geolocalisation)
                            ? 'Geolocalisation'
                            : this.state.city
                        }
                    </p>
                    <button className="add-form__content__reset">Réinitialiser</button>
                    <button className="add-form__content__add" onClick={e => this.register()}>Ajouter</button>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="shadowed-goo">
                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                            <feComposite in2="shadow" in="goo" result="goo" />
                            <feComposite in2="goo" in="SourceGraphic" result="mix" />
                        </filter>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                            <feComposite in2="goo" in="SourceGraphic" result="mix" />
                        </filter>
                    </defs>
                </svg>
            </section>
        );
    }
}
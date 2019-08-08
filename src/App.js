import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './screens/Login/Login';
import {Reinitialize} from "./screens/Reinitialize/Reinitialize";
import {EditProfile} from "./screens/EditProfile/EditProfile";

import './index.css';

export class App extends React.Component {

    constructor(props) {
        super(props);

        if(null !== localStorage.getItem('lang')) {

            this.state = {
                lang: localStorage.getItem('lang')
            };
        } else {
            this.state = {
                lang: navigator.language || navigator.userLanguage
            };
        }
    }

    changeLanguage = (lang) => {

        localStorage.setItem('lang', lang);
        this.setState({
            lang: localStorage.getItem('lang')
        });
    };

    render() {

        const { lang } = this.state;
        return (
            <BrowserRouter>
              <Switch>
                  <Route
                      exact
                      path="/"
                      render={() => (
                          <Login lang={lang} changeLanguage={this.changeLanguage} />
                      )}
                  />
                  <Route
                      exact
                      lang={lang}
                      path="/reinitialize"
                      render={() => (
                          <Reinitialize lang={lang} changeLanguage={this.changeLanguage} />
                      )}
                  />
                  <Route
                      exact
                      path="/edit-profile"
                      render={() => (
                          <EditProfile lang={lang} changeLanguage={this.changeLanguage} />
                      )}
                  />
              </Switch>
            </BrowserRouter>
        );
    }
}

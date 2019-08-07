import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './screens/Login/Login';
import {Reinitialize} from "./screens/Reinitialize/Reinitialize";

import './index.css';

export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
              <Switch>
                  <Route
                      exact
                      path="/"
                      render={() => (
                          <Login />
                      )}
                  />
                  <Route
                      exact
                      path="/reinitialize"
                      render={() => (
                          <Reinitialize />
                      )}
                  />
              </Switch>
            </BrowserRouter>
        );
    }
}

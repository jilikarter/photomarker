import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './screens/Login/Login';
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
              </Switch>
            </BrowserRouter>
        );
    }
}

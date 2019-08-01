import React, { Component } from 'react';
import { List } from "../../components/List/List";

import './Home.css';

export class Home extends Component {

    render() {
        const { isAdmin } = this.props;
        return (
            <React.Fragment>
                <header className="header">
                    <h1>Mon premier album</h1>
                </header>
                <main className="main">
                    <List isAdmin={isAdmin} />
                </main>
            </React.Fragment>
        );
    }
}
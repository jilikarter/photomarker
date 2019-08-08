import React, { Component } from 'react';

import {Menu} from "../../components/Menu/Menu";
import { List } from "../../components/List/List";

import './Home.css';

export class Home extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        const { isAdmin, accessTemporary, signOut } = this.props;
        return (
            <React.Fragment>
                {
                    !accessTemporary
                        ? <Menu signOut={signOut} />
                        : null
                }
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
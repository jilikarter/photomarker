import React, { Component } from 'react';

import {Menu} from "../../components/Menu/Menu";
import { List } from "../../components/List/List";
import {Trad} from "../../components/Trad/Trad";

import './Home.css';

export class Home extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        const { lang, isAdmin, accessTemporary, signOut } = this.props;
        return (
            <React.Fragment>
                {
                    !accessTemporary
                        ? <Menu lang={lang} signOut={signOut} />
                        : null
                }
                <header className="header">
                    <h1><Trad lang={lang} code={'home.title'}/></h1>
                </header>
                <main className="main">
                    <List lang={lang} isAdmin={isAdmin} />
                </main>
            </React.Fragment>
        );
    }
}
import React, { Component } from 'react';

import {Tile} from "../Tile/Tile";
import {Birth} from "../Birth/Birth";

import { getAllArticles } from "../../services/Firebase";

import './List.css';

export class List extends Component {

    state = {
        articles: []
    };

    componentDidMount() {

        const articles = getAllArticles();

        setTimeout(() => {
            this.setState({
                articles
            });
        }, 400);
    }

    render() {

        const { isAdmin } = this.props;
        const list = this.state.articles;

        return (
            <section className="list">
                {list.map( item  => (
                    <Tile datas={item} isAdmin={isAdmin} key={Math.random() * 100} />
                ))}
                <Birth/>
            </section>
        );
    }
}
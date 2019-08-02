import React, { Component } from 'react';
import {fbGetBirth, getAllArticles} from "../../services/Firebase";

import {Tile} from "../Tile/Tile";
import {Birth} from "../Birth/Birth";
import {BirthShadow} from "../BirthShadow/BirthShadow";

import './List.css';

export class List extends Component {

    state = {
        articles: [],
        birth: null
    };

    fetchAll() {
        const articles = getAllArticles();
        setTimeout(() => {
            this.setState({
                articles
            });
        }, 600);
    }

    componentDidMount() {

        this.fetchAll();
        const births = fbGetBirth();

        setTimeout(() => {
            let birth = {};
            births.map( item  => (
                birth = item
            ));
            this.setState({
                birth: {
                    name: birth.name,
                    size: birth.size,
                    weight: birth.weight,
                    text: birth.text,
                    timestamp: birth.timestamp
                }
            });
        }, 1000);
    }

    render() {

        const { isAdmin } = this.props;
        const { articles, birth } = this.state;
        return (
            <section className="list">
                {
                    articles.length !== 0
                    ? articles.map( item  => (
                            <Tile datas={item} isAdmin={isAdmin} key={Math.random() * 100} update={() => this.fetchAll} />
                        ))
                    : null
                }
                {
                    birth
                        ? <Birth datas={birth} isAdmin={isAdmin} />
                        : <BirthShadow />
                }
            </section>
        );
    }
}
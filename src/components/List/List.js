import React, { Component } from 'react';
import {fbGetBirth, getAllArticles} from "../../services/Firebase";

import {Tile} from "../Tile/Tile";
import {Birth} from "../Birth/Birth";
import {BirthShadow} from "../BirthShadow/BirthShadow";
import {TileShadow} from "../TileShadow/TileShadow";

import './List.css';

export class List extends Component {

    state = {
        shadowTile: true,
        articles: [],
        birth: null
    };

    fetchAll = async (showTileShadow) => {

        this.setState({
            shadowTile: showTileShadow,
            articles: []
        });
        const articles = await getAllArticles();
        this.setState({
            articles
        });
    }

    async componentDidMount() {

        const births = await fbGetBirth();
        this.fetchAll(false);

        let birth = {};
        births.map( item  => (
            birth = item
        ));
        this.setState({
            birth: birth
        });
    }

    render() {

        const { isAdmin } = this.props;
        const { articles, birth, shadowTile } = this.state;
        return (
            <section className="list">
                {
                    articles.length !== 0
                    ? articles.map( item  => (
                            <Tile datas={item} isAdmin={isAdmin} key={Math.random() * 100} update={this.fetchAll} />
                        ))
                    : shadowTile ? <TileShadow /> : null
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
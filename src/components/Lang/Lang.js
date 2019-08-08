import React, { Component } from 'react';

import './Lang.css';

export class Lang extends Component {

    changeLanguage(futureLang) {

        const { changeLanguage, lang } = this.props;
        if(futureLang !== lang) {

            changeLanguage(futureLang);
        }
    }

    render() {

        const { lang } = this.props;
        return (
            <React.Fragment>
                {/*<div className="lang-container">*/}
                    {/*<button className={`lang lang--fr${lang === 'fr-FR' ? ' lang--active' : ''}`} onClick={() => this.changeLanguage('fr-FR')}></button>*/}
                    {/*<button className={`lang lang--en${lang === 'en-EN' ? ' lang--active' : ''}`}  onClick={() => this.changeLanguage('en-EN')}></button>*/}
                {/*</div>*/}
            </React.Fragment>
        );
    }
}
import React, { Component } from 'react';
import Img from 'react-fix-image-orientation';

import './InputFile.css';

export class InputFile extends Component {

    handleChange(e) {

        const { getImage } = this.props;
        const file = e.target.files[0];
        if(file) {

            getImage(e.target.files[0]);
        }
    }

    render() {
        const { id, name, picture } = this.props;

        return (
            <label className="input-file" htmlFor="file" >
                { null !== picture
                    ? <Img alt="une preview de ce qu'il sera présent sur la tuile" className="input-file__preview" src={picture} onClick={e => this.removeFile(e)} />
                    : null
                }
                <input className="input-file__input" accept="image/*" id={id} name={name} onChange={(e) => { this.handleChange(e)}} type="file"/>
            </label>
        );
    }
}
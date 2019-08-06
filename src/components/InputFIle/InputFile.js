import React, { Component } from 'react';

import './InputFile.css';

export class InputFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: null,
            file: ''
        }
    }

    handleChange(e) {

        const { getImage } = this.props;
        const file = e.target.files[0];
        if(file) {

            this.setState({
                fileName: e.target.value,
                file: URL.createObjectURL(e.target.files[0])
            });
            getImage(e.target.files[0]);
        } else {

            this.removeFile(e);
        }
    }

    removeFile() {

        this.setState({
            fileName: null,
            file: ''
        });
    }

    render() {
        const { fileName, file } = this.state;
        const { id, name } = this.props;

        return (
            <label className="input-file" data-name={fileName} htmlFor="file" >
                <input className="input-file__input" accept="image/*" capture="filesystem" id={id} name={name} onChange={(e) => { this.handleChange(e)}} type="file"/>
                { null !== fileName
                    ? <img alt="une preview de ce qu'il sera présent sur la tuile" className="input-file__preview" src={file} onClick={e => this.removeFile(e)} />
                    : null
                }
            </label>
        );
    }
}
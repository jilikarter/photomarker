import React, { Component } from 'react';

import moment from 'moment';
import 'moment/locale/fr';

import './Time.css';

export class Time extends Component {

    render() {
        const { time } = this.props;

        moment.locale();
        const date = moment(time);
        
        return (
            <time className="time" dateTime={date.format('YYYY-MM-DD hh:mm')}>
                <span className="time__day">{date.format('DD')}</span>
                <span className="time__month">{date.format('MMM')}</span>
                <span className="time__year">{date.format('YYYY')}</span>
                <span className="time__hour">{date.format('hh')}</span>
                <span className="time__minute">{date.format('mm')}</span>
            </time>
        );
    }
}
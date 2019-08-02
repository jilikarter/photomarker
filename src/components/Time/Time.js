import React, { Component } from 'react';

import moment from 'moment';
import 'moment/locale/fr';

import './Time.css';

export class Time extends Component {

    constructor(props) {
        super(props);

        const { time } = this.props;

        moment.locale();
        const date = moment(time);
        this.state = {
            date: date
        };
    }

    changeDate(datetime) {

        const { getTimestamp } = this.props;
        moment.locale();
        const date = moment(datetime);
        this.setState({
            date: date
        });

        getTimestamp(date.valueOf());
    }

    changeDateNow() {

        moment.locale();
        const date = moment();
        this.changeDate(date.valueOf());
    }

    render() {

        const { mode } = this.props;
        const { date } = this.state;
        return (
            mode === 'edition'
                ? <time className="time time--edition" dateTime={date.format('YYYY-MM-DD hh:mm')}>
                    <input type="datetime-local" value={date.format('YYYY-MM-DDTHH:mm')} onChange={(e) => {this.changeDate(e.target.value)}} />
                    <button onClick={() => {this.changeDateNow()}}>AUJ</button>
                </time>
                : <time className="time" dateTime={date.format('YYYY-MM-DD hh:mm')}>
                    <span className="time__day">{date.format('DD')}</span>
                    <span className="time__month">{date.format('MMM')}</span>
                    <span className="time__year">{date.format('YYYY')}</span>
                    <span className="time__hour">{date.format('HH')}</span>
                    <span className="time__minute">{date.format('mm')}</span>
                </time>

        );
    }
}
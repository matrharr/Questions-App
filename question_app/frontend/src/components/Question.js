import React, { Component } from 'react';
import OrderableAnswers from "./OrderableAnswers";

export default class Question extends Component {

    render() {
        const {
            question,
        } = this.props;

        return (
            <div>
                <h1>{question.description}</h1>
                <OrderableAnswers question={question}/>
            </div>
        )
    }
}

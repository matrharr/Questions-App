import React, { Component } from 'react';
import OrderableAnswers from "./OrderableAnswers";

export default class Question extends Component {

    render() {
        const {
            question,
        } = this.props;

        return (
            <div>
                <div className="jumbotron" style={{background:"transparent"}}>
                    <p>{question.description}</p>
                    <p>Reorder the list to the correct order:</p>
                </div>
                <OrderableAnswers question={question}/>
            </div>
        )
    }
}

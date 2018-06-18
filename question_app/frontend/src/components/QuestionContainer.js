import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';

import Question from './Question';
import * as actions from '../actions';

@DragDropContext(HTML5Backend)
class QuestionContainer extends Component {
    render() {
        const {
            data,
            currentQuestion,
            nextQuestion,
            nextDisabled,
            prevQuestion,
            prevDisabled,
        } = this.props;

        return (
            <div>
                <Question question={currentQuestion} />
                <button disabled={prevDisabled} onClick={ prevQuestion }>Prev</button>
                <button disabled={nextDisabled} onClick={ nextQuestion }>Next</button>
                <hr />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
                currentQuestion: state.currentQuestion,
                prevDisabled: state.prevDisabled,
                nextDisabled: state.nextDisabled,
           };
};

const mapDispatchToProps = dispatch => {
    return {
        nextQuestion: question => dispatch(actions.nextQuestion()),
        prevQuestion: question => dispatch(actions.prevQuestion()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);

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
            <div className="container">
                <Question question={currentQuestion} />
                <div className="row">
                    <div className="col">
                        <button className="btn btn-outline-primary" style={{borderRadius: '40%'}} disabled={prevDisabled} onClick={ prevQuestion }>Previous</button>
                    </div>
                    <div className="col-md-auto">
                        <button className="btn btn-primary" style={{borderRadius: '40%'}} disabled={nextDisabled} onClick={ nextQuestion }>Next</button>
                    </div>
                </div>
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

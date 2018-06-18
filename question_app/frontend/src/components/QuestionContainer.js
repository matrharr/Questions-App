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
            reset,
        } = this.props;

        return (
            <div className="container">
                <div className="border bg-white">
                    <Question question={currentQuestion} />
                    <button style={{border:"none"}} className="text-primary" onClick={reset}>RESET</button>
                </div>
                <div className="col-xs-12" style={{height:"50px"}}></div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-lg btn-outline-primary" style={{borderRadius: '50%'}} disabled={prevDisabled} onClick={ prevQuestion }>Previous</button>
                    </div>
                    <div className="col-md-auto">
                        <button className="btn btn-lg btn-primary" style={{borderRadius: '50%'}} disabled={nextDisabled} onClick={ nextQuestion }>Next</button>
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
        reset: () => dispatch(actions.reset()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);

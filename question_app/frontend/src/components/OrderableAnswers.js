import React, { Component } from 'react';
import { connect } from 'react-redux';

import DraggableOption from './DraggableOption';
import DroppableTarget from './DroppableTarget';
import * as actions from '../actions';

class OrderableAnswers extends Component {
    handleDrop(id, option) {
        this.props.dropOption(id, option);
    }

    createDraggableOption(option) {
        return <DraggableOption option={option} />;
    }

    createDraggableOptions(options) {
        return options.map(this.createDraggableOption);
    }

    render() {
        const {
            question,
            targets,
            emptyOptions,
            selectedOption,
            arrowRight,
            arrowLeft,
            arrowUp,
            arrowDown,
        } = this.props;
        let disableUpAndDown = true;
        targets[question.id].map((target) =>{
            if (target && target.id === selectedOption.id) {
                disableUpAndDown = false;
            }
        })

        return (
            <div className="row">
                <div className="col-5">
                    {question.options.map((option) => (
                        emptyOptions[option.id] ?
                        <div>
                            <div
                            className='btn btn-light'
                            style={{borderStyle: 'dashed', color: 'white', borderColor: 'black', width: '75%' }}
                            >
                                <span>--------------</span>
                            </div>
                            <div className="w-100"></div>
                        </div>
                        :<div>
                            <DraggableOption
                                option={option}
                            />
                            <div className="w-100"></div>
                        </div>
                    ))}
                </div>
                <div className="col-1">
                    <button disabled={!selectedOption} onClick={arrowRight}>→</button>
                    <div className="w-100"></div>
                    <button disabled={!selectedOption} onClick={arrowLeft}>←</button>
                </div>
                <div className="col-5">
                    {Object.keys(targets[question.id]).map((key) => (
                        targets[question.id][key] ?
                        <div>
                            <DraggableOption
                                option={targets[question.id][key]}
                            />
                            <div className="w-100"></div>
                        </div>
                        :<div>
                            <DroppableTarget
                                onDrop={option => this.handleDrop(key, option)}
                                count={key}
                            />
                            <div className="w-100"></div>
                        </div>
                    ))}
                </div>
                <div className="col-1">
                    <button disabled={!selectedOption || disableUpAndDown} onClick={arrowUp}>↑</button>
                    <div className="w-100"></div>
                    <button disabled={!selectedOption || disableUpAndDown} onClick={arrowDown}>↓</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        targets: state.targets,
        emptyOptions: state.emptyOptions,
        selectedOption: state.selectedOption,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        arrowRight: () => dispatch(actions.arrowRight()),
        arrowLeft: () => dispatch(actions.arrowLeft()),
        arrowUp: () => dispatch(actions.arrowUp()),
        arrowDown: () => dispatch(actions.arrowDown()),
        dropOption: (id, option) => dispatch(actions.dropOption(id, option)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderableAnswers);

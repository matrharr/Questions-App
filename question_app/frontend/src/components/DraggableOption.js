import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import { ItemTypes } from '../constants';
import * as actions from '../actions';

const optionSource = {
    beginDrag(props) {
        props.selectOption(props.option);
		return {
			option: props.option,
		}
	},

    endDrag(props: BoxProps, monitor: DragSourceMonitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
			let alertMessage = ''
			const isDropAllowed =
				dropResult.allowedDropEffect === 'any' ||
				dropResult.allowedDropEffect === dropResult.dropEffect

			if (isDropAllowed) {
				const isCopyAction = dropResult.dropEffect === 'copy'
				const actionName = isCopyAction ? 'copied' : 'moved'
				alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
			} else {
				alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${
					dropResult.name
				}`
			}
			alert(alertMessage)
		}
	},
}

@DragSource(
    ItemTypes.OPTION,
    optionSource,
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }),
)
class DraggableOption extends Component {

    render() {
        const {
            isDragging,
            connectDragSource,
            option,
            selectOption,
            selectedOption,
        } = this.props;
        let isSelected = false;
        if (selectedOption) {
            isSelected = selectedOption.id === option.id;
        }
        const style = isSelected ? { background: 'blue', color: 'white', width: '75%', 'padding': '3%'} : {width: '75%', 'padding': '3%'};
        return (
            connectDragSource &&
            connectDragSource(
                <div
                className={"btn btn-light border border-dark " + (isSelected ? 'btn-lg': '')}
                onClick={ () => selectOption(option) }
                style={style}
                >
                    {option.text}
                </div>
            )
        )
    }
}

const mapStateToProps = state => {
    return { selectedOption: state.selectedOption };
};

const mapDispatchToProps = dispatch => {
    return {
        selectOption: option => dispatch(actions.selectOption(option)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableOption);

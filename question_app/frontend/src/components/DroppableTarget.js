import React, { Component } from 'react';
import { DropTarget, ConnectDropTarget } from 'react-dnd';

import { ItemTypes } from '../constants';

const optionTarget = {
	drop(props, monitor) {
		props.onDrop(monitor.getItem());
	},
}

@DropTarget(ItemTypes.OPTION, optionTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))
export default class DroppableTarget extends Component {

	render() {
        const {
			canDrop,
			isOver,
			allowedDropEffect,
			connectDropTarget
		} = this.props
		const isActive = canDrop && isOver

        return (
            connectDropTarget &&
			connectDropTarget(
				<div
				className='btn btn-light'
				style={{borderStyle: 'dashed', color: 'white', borderColor: 'black', text: 'black'}}>
					{isActive ? 'Release to drop' : 'Drag a box here'}
				</div>,
            )
        )
    }
}

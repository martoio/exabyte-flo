import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'semantic-ui-react';
import {DragSource} from 'react-dnd';

//TODO: move this to some config file
const ItemTypes = {
	BLOCK: 'block'
};

const blockSource = {
	beginDrag(props) {
		return {};
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}


class FlowBlock extends React.Component {

	render() {
		const {connectDragSource, isDragging} = this.props;

		return connectDragSource(
			<div>
				<Card
					fluid
					style={{
						opacity: isDragging ? 0.5 : 1,
						cursor: 'move'
					}}
					header='Start Block'
				/>
			</div>

		);
	}

}

FlowBlock.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(FlowBlock);
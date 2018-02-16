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
		//ShapeId is of model '#nodeType'. .substring to pass it along w/o #
		return {blockType: props.shapeId.substring(1)};
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}


class FlowBlock extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		const {connectDragSource, isDragging} = this.props;

		return connectDragSource(
			<div>
				<Card.Group>
					<Card
						style={{
							opacity: isDragging ? 0.5 : 1,
							cursor: 'move'
						}}
					>
						<Card.Header>{this.props.name || 'Empty'}</Card.Header>
						<Card.Content>{this.props.children}</Card.Content>

					</Card>
				</Card.Group>


			</div>
		);
	}

}

FlowBlock.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(FlowBlock);
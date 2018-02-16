import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'semantic-ui-react';
import {DragSource} from 'react-dnd';
import GraphConfig from '../../Flowchart/graph-config';
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
				<Card.Group>
					<Card
						styled
						style={{
							opacity: isDragging ? 0.5 : 1,
							cursor: 'move'
						}}
					>
						<Card.Header>Start Block</Card.Header>
						<Card.Content>{GraphConfig.NodeTypes.empty.shapeSVG}</Card.Content>

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
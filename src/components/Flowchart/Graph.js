import React, {Component} from 'react';
import GraphConfig from './graph-config';
import GraphView from 'react-digraph';
import {DropTarget} from 'react-dnd';

const styles = {
	graph: {
		height: '100%',
		width: '100%'
	}
};

class Graph extends Component {

	constructor(props) {
		super(props);
		this.getViewNode = this.props.getViewNode;
		this.onSelectNode = this.props.onSelectNode;
		this.onCreateNode = this.props.onCreateNode;
		this.onUpdateNode = this.props.onUpdateNode;
		this.onDeleteNode = this.props.onDeleteNode;
		this.onSelectEdge = this.props.onSelectEdge;
		this.onCreateEdge = this.props.onCreateEdge;
		this.onSwapEdge = this.props.onSwapEdge;
		this.onDeleteEdge = this.props.onDeleteEdge;
	}

	/*
	 * Render
	 */

	render() {
		const nodes = this.props.graph.nodes;
		const edges = this.props.graph.edges;
		const selected = this.props.selected;
		const connectDropTarget = this.props.connectDropTarget;
		const isOver = this.props.isOver;
		return connectDropTarget(
			<div id='graph' style={styles.graph}>

				<GraphView
					ref={(el) => {
						this.GraphView = el;
					}}
					nodeKey={GraphConfig.NodeKey}
					emptyType={GraphConfig.NodeTypes.empty.ref}
					nodes={nodes}
					edges={edges}
					selected={selected}
					nodeTypes={GraphConfig.NodeTypes}
					nodeSubtypes={GraphConfig.NodeSubtypes}
					edgeTypes={GraphConfig.EdgeTypes}
					enableFocus={true}
					getViewNode={this.props.getViewNode}
					onSelectNode={this.props.onSelectNode}
					onCreateNode={this.props.onCreateNode}
					onUpdateNode={this.props.onUpdateNode}
					onDeleteNode={this.props.onDeleteNode}
					onSelectEdge={this.props.onSelectEdge}
					onCreateEdge={this.props.onCreateEdge}
					onSwapEdge={this.props.onSwapEdge}
					onDeleteEdge={this.props.onDeleteEdge}
				/>
				{isOver &&
				<div style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					width: '100%',
					zIndex: 1,
					opacity: 0.5,
					backgroundColor: 'yellow',
				}} />
				}
			</div>
		);
	}

}

const FlowChartTarget = {
	drop(props, monitor, component){
		const item = monitor.getItem();
		//TODO: ADD NODE TO GRAPH;
		props.addNodeOnDrop(item.blockType);
		return {moved: true};
	}
};

function collect(connect, monitor){
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		isOverCurrent: monitor.isOver({shallow: true}),
		canDrop: monitor.canDrop,
		itemType: monitor.getItemType()
	};
}

//TODO: THIS HAS TO BE EXTRACTED TO CONFIG
export default DropTarget('block', FlowChartTarget, collect)(Graph);

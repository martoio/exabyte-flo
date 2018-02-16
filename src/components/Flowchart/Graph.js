import React, {Component} from 'react';
import GraphConfig from './graph-config';
import GraphView from 'react-digraph';

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

		return (
			<div id='graph' style={styles.graph}>

				<GraphView
					ref={(el) => this.GraphView = el}
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
			</div>
		);
	}

}

export default Graph;

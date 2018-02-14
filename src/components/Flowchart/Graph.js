import React, {Component} from 'react';
import GraphConfig from './graph-config';
import GraphView from 'react-digraph';

const styles = {
	graph: {
		height: '100%',
		width: '100%'
	}
};

const NODE_KEY = "id"; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
const EMPTY_TYPE = "empty"; // Empty node type
const SPECIAL_TYPE = "special";
const SPECIAL_CHILD_SUBTYPE = "specialChild";
const BEGIN_BLOCK_TYPE = "begin";
const END_BLOCK_TYPE = "end";
const PROCESS_BLOCK_TYPE = "process";
const DECISION_BLOCK_TYPE = "decision";
const EMPTY_EDGE_TYPE = "emptyEdge";
const SPECIAL_EDGE_TYPE = "specialEdge";

// NOTE: Edges must have 'source' & 'target' attributes
// In a more realistic use case, the graph would probably originate
// elsewhere in the App or be generated from some other state upstream of this component.
// const sample = {
// 	"nodes": [
// 		{
// 			"id": 1,
// 			"title": "Node A",
// 			"x": 258.3976135253906,
// 			"y": 331.9783248901367,
// 			"type": BEGIN_BLOCK_TYPE
// 		},
// 		{
// 			"id": 2,
// 			"title": "Node B",
// 			"x": 593.9393920898438,
// 			"y": 260.6060791015625,
// 			"type": PROCESS_BLOCK_TYPE,
// 		},
// 		{
// 			"id": 3,
// 			"title": "Node C",
// 			"x": 237.5757598876953,
// 			"y": 61.81818389892578,
// 			"type": DECISION_BLOCK_TYPE
// 		},
// 		{
// 			"id": 4,
// 			"title": "Node C",
// 			"x": 600.5757598876953,
// 			"y": 600.81818389892578,
// 			"type": EMPTY_TYPE
// 		}
// 	],
// 	"edges": [
// 		{
// 			"source": 1,
// 			"target": 2,
// 			"type": SPECIAL_EDGE_TYPE
// 		},
// 		{
// 			"source": 2,
// 			"target": 4,
// 			"type": EMPTY_EDGE_TYPE
// 		}
// 	]
// };

class Graph extends Component {

	constructor(props) {
		super(props);
		console.log(props.graph);
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

		const NodeTypes = GraphConfig.NodeTypes;
		const NodeSubtypes = GraphConfig.NodeSubtypes;
		const EdgeTypes = GraphConfig.EdgeTypes;

		return (
			<div id='graph' style={styles.graph}>

				<GraphView
					ref={(el) => this.GraphView = el}
					nodeKey={NODE_KEY}
					emptyType={EMPTY_TYPE}
					nodes={nodes}
					edges={edges}
					selected={selected}
					nodeTypes={NodeTypes}
					nodeSubtypes={NodeSubtypes}
					edgeTypes={EdgeTypes}
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

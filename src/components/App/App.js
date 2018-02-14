import React, {Component} from 'react';
import './App.css';

import EditorController from "../EditorController/EditorController";
import LibraryWindow from "../Windows/LibraryWindow";
import ConsoleWindow from "../Windows/ConsoleWindow";
import JSONWindow from "../Windows/JSONWindow";
import Graph from "../Flowchart/Graph";
import GraphConfig from '../Flowchart/graph-config';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


console.log(GraphConfig.NodeTypes.begin.shape);
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

class App extends Component {
	constructor() {
		super();
		this.state = {
			windows: {
				library: true,
				json: true,
				console: false
			},
			graph: {
				nodes: [],
				edges: []
			},
			selected: {},
			blockType: EMPTY_TYPE
		};
	}

	changeBlockType(t){
		switch (t){

			case 'begin':
				this.setState({blockType: BEGIN_BLOCK_TYPE});
				break;
			case 'end':
				this.setState({blockType: END_BLOCK_TYPE});
				break;
			case 'process':
				this.setState({blockType: PROCESS_BLOCK_TYPE});
				break;
			case 'decision':
				this.setState({blockType: DECISION_BLOCK_TYPE});
				break;
			default:
				this.setState({blockType: EMPTY_TYPE});
				break;
		}
	}

	/**
	 * updates the state for window display;
	 * @param win
	 */
	onWindowToggle(win) {
		let update = this.state.windows;
		update[win] = !this.state.windows[win];
		this.setState(update);
	}

	/**
	 * Utility method to find if the left-pane has to display windows or placeholder
	 */
	hasWindows() {
		let w = this.state.windows;
		return w.library || w.json || w.console;
	}

	// Helper to find the index of a given node
	getNodeIndex(searchNode) {
		return this.state.graph.nodes.findIndex((node) => {
			return node[NODE_KEY] === searchNode[NODE_KEY]
		})
	}

	// Helper to find the index of a given edge
	getEdgeIndex(searchEdge) {
		return this.state.graph.edges.findIndex((edge) => {
			return edge.source === searchEdge.source &&
				edge.target === searchEdge.target
		})
	}

	// Given a nodeKey, return the corresponding node
	getViewNode = nodeKey => {
		const searchNode = {};
		searchNode[NODE_KEY] = nodeKey;
		const i = this.getNodeIndex(searchNode);
		return this.state.graph.nodes[i]
	};

	/*
	 * Handlers/Interaction
	 */

	// Called by 'drag' handler, etc..
	// to sync updates from D3 with the graph
	onUpdateNode = viewNode => {
		const graph = this.state.graph;
		const i = this.getNodeIndex(viewNode);

		graph.nodes[i] = viewNode;
		this.setState({graph: graph});
	};

	// Node 'mouseUp' handler
	onSelectNode = viewNode => {
		// Deselect events will send Null viewNode
		if (!!viewNode) {
			this.setState({selected: viewNode});
		} else {
			this.setState({selected: {}});
		}
	};

	// Edge 'mouseUp' handler
	onSelectEdge = viewEdge => {
		this.setState({selected: viewEdge});
	};

	// Updates the graph with a new node
	onCreateNode = (x, y) => {
		const graph = this.state.graph;
		// This is just an example - any sort of logic
		// could be used here to determine node type
		// There is also support for subtypes. (see 'sample' above)
		// The subtype geometry will underlay the 'type' geometry for a node
		const type = this.state.blockType;
		console.log(this.state.blockType);
		const viewNode = {
			id: this.state.graph.nodes.length + 1,
			title: '',
			type: type,
			x: x,
			y: y
		};

		graph.nodes.push(viewNode);
		this.setState({graph: graph});
	};

	// Deletes a node from the graph
	onDeleteNode = viewNode => {
		const graph = this.state.graph;
		const i = this.getNodeIndex(viewNode);
		graph.nodes.splice(i, 1);

		// Delete any connected edges
		const newEdges = graph.edges.filter((edge, i) => {
			return edge.source !== viewNode[NODE_KEY] &&
				edge.target !== viewNode[NODE_KEY]
		});

		graph.edges = newEdges;

		this.setState({graph: graph, selected: {}});
	};

	// Creates a new node between two edges
	onCreateEdge = (sourceViewNode, targetViewNode) => {
		const graph = this.state.graph;

		// This is just an example - any sort of logic
		// could be used here to determine edge type
		const type = sourceViewNode.type === SPECIAL_TYPE ? SPECIAL_EDGE_TYPE : EMPTY_EDGE_TYPE;

		const viewEdge = {
			source: sourceViewNode[NODE_KEY],
			target: targetViewNode[NODE_KEY],
			type: type
		};

		// Only add the edge when the source node is not the same as the target
		if (viewEdge.source !== viewEdge.target) {
			graph.edges.push(viewEdge);
			this.setState({graph: graph});
		}
	};

	// Called when an edge is reattached to a different target.
	onSwapEdge = (sourceViewNode, targetViewNode, viewEdge) => {
		const graph = this.state.graph;
		const i = this.getEdgeIndex(viewEdge);
		const edge = JSON.parse(JSON.stringify(graph.edges[i]));

		edge.source = sourceViewNode[NODE_KEY];
		edge.target = targetViewNode[NODE_KEY];
		graph.edges[i] = edge;

		this.setState({graph: graph});
	};

	// Called when an edge is deleted
	onDeleteEdge = viewEdge => {
		const graph = this.state.graph;
		const i = this.getEdgeIndex(viewEdge);
		graph.edges.splice(i, 1);
		this.setState({graph: graph, selected: {}});
	};


	render() {
		const hasWindows = this.hasWindows();
		return (
			<main>
				<header className="Flo-header">
					<h1>Flo</h1>
				</header>
				<div className="Flo-content">
					<div className='Flo-left-pane'>
						{!hasWindows > 0 &&
						<div className='window-holder'>
							<i className="fas fa-edit"/>
						</div>
						}
						<LibraryWindow
							isVisible={this.state.windows.library}
							changeBlockType={this.changeBlockType.bind(this)}
						/>
						<JSONWindow
							isVisible={this.state.windows.json}
							graph={this.state.graph}
						/>
						<ConsoleWindow
							isVisible={this.state.windows.console}
						/>
						<EditorController
							windows={this.state.windows}
							onWindowToggle={this.onWindowToggle.bind(this)}
						/>
					</div>
					<div className='Flo-right-pane'>
						<Graph
							graph={this.state.graph}
							selected={this.state.selected}
							nodeType={this.state.blockType}
							getViewNode={this.getViewNode.bind(this)}
							onSelectNode={this.onSelectNode.bind(this)}
							onCreateNode={this.onCreateNode.bind(this)}
							onUpdateNode={this.onUpdateNode.bind(this)}
							onDeleteNode={this.onDeleteNode.bind(this)}
							onSelectEdge={this.onSelectEdge.bind(this)}
							onCreateEdge={this.onCreateEdge.bind(this)}
							onSwapEdge={this.onSwapEdge.bind(this)}
							onDeleteEdge={this.onDeleteEdge.bind(this)}
						/>
					</div>
				</div>

			</main>
		);
	}
}

export default DragDropContext(HTML5Backend)(App);

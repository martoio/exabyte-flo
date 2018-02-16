import React, {Component} from 'react';
import './App.css';

import EditorController from "../EditorController/EditorController";
import LibraryWindow from "../Windows/LibraryWindow/LibraryWindow";
import ConsoleWindow from "../Windows/ConsoleWindow/ConsoleWindow";
import JSONWindow from "../Windows/JSONWindow/JSONWindow";
import Graph from "../Flowchart/Graph";
import GraphConfig from '../Flowchart/graph-config';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import NodeEditWindow from "../Windows/NodeEditWindow/NodeEditWindow";

const NODE_KEY = GraphConfig.NodeKey; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
//TODO: REFACTOR SO THESE CAN BE REMOVED. THEY ARE UNNECESSARY
const EMPTY_TYPE = "empty"; // Empty node type
const SPECIAL_TYPE = "special";
const EMPTY_EDGE_TYPE = "emptyEdge";
const SPECIAL_EDGE_TYPE = "specialEdge";
const EDITABLE_NODES = [
	GraphConfig.NodeTypes.decision.typeText.toLowerCase(),
	GraphConfig.NodeTypes.process.typeText.toLowerCase(),
];
class App extends Component {
	constructor() {
		super();
		this.state = {
			windows: {
				library: true,
				json: true,
				console: false,
				node: false
			},
			graph: {
				nodes: [],
				edges: []
			},
			selected: {},
			blockType: EMPTY_TYPE,
			nextEdgeId: 0,
			nextNodeId: 0,
			lastAddedNode: -1,
			canEditNode: false
		};
	}

	error(msg){
		alert(msg);
	}

	/**
	 * updates the state for window display;
	 * @param win - one of ['library', 'console', 'json'] passed from onClick of EditorController;
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
		return w.library || w.json || w.console || w.node;
	}

	/**
	 * @param type - node type to add. Check /src/components/Flowchart/graph-config. type corresponds to shapeId
	 * inside NodeTypes;
	 */
	addNodeOnDrop(type){
		let graph = this.state.graph;
		if(graph.nodes.length === 0 && type !== GraphConfig.NodeTypes.begin.typeText.toLowerCase()) {
			this.error('First node has to be a Begin node!');
			return;
		}
		//TODO: figure out how to get mouse location coordinates from GraphView
		const newNode = {
			id: this.state.nextNodeId,
			title: '',
			type: type,
			x: 0,
			y: 0,
			outEdge: null,
			inEdge: null
		};
		//Decision nodes have 2 outgoing edges, which we represent with an extra key in our object.
		if(type === GraphConfig.NodeTypes.decision.typeText.toLowerCase()) {
			newNode['falseEdge'] = null;
		}
		graph.nodes.push(newNode);
		this.setState({
			graph: graph,
			lastAddedNode: newNode.id,
			nextNodeId: this.state.nextNodeId+1,
		});
	}

	// Helper to find the index of a given node
	getNodeIndex(searchNode) {
		return this.state.graph.nodes.findIndex((node) => {
			return node[NODE_KEY] === searchNode[NODE_KEY]
		});
	}

	// Helper to find the index of a given edge
	getEdgeIndex(searchEdge) {
		return this.state.graph.edges.findIndex((edge) => {
			return edge.source === searchEdge.source &&
				edge.target === searchEdge.target
		});
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
			this.setState({
				selected: viewNode,
				canEditNode: EDITABLE_NODES.includes(viewNode.type)
			});
		} else {
			let update = this.state.windows;
			update.node = false;
			this.setState({
				selected: {},
				canEditNode: false,
				windows: update
			});
		}
	};

	// Edge 'mouseUp' handler
	onSelectEdge = viewEdge => {
		this.setState({selected: viewEdge});
	};

	// Updates the graph with a new node
	//Required by digraph. Since we aren't using Shift+click to add nodes, function is left empty;
	onCreateNode = (x, y) => {};

	// Deletes a node from the graph
	//NOTE: digraph implementation does not seem to call this function
	//when you are trying to delete the first node...?
	onDeleteNode = viewNode => {
		const graph = this.state.graph;
		const i = this.getNodeIndex(viewNode);
		graph.nodes.splice(i, 1);

		// Delete any connected edges
		let deletedEdges = [];
		const newEdges = graph.edges.filter((edge, i) => {
			if(edge.target === viewNode.id || edge.source === viewNode.id){
				deletedEdges.push(edge.id);
				return false;
			}
			return true;
		});
		//Find nodes that still have a reference to the deleted edges
		graph.nodes.forEach((node) => {
			if(deletedEdges.includes(node.inEdge)){
				node.inEdge = null;
			}
			if(deletedEdges.includes(node.outEdge)){
				node.outEdge = null;
			}
			if(deletedEdges.includes(node.falseEdge)){
				node.falseEdge = null;
			}
		});

		graph.edges = newEdges;

		this.setState({
			graph: graph,
			selected: {},

		});
	};

	//TODO: make more succinct
	// Creates a new node between two edges
	onCreateEdge = (sourceViewNode, targetViewNode) => {
		if(sourceViewNode.id === targetViewNode.id){
			this.error('Cannot set edge on same node!');
			return;
		}
		const graph = this.state.graph;

		//Error checking;
		if(targetViewNode.type === GraphConfig.NodeTypes.begin.typeText.toLowerCase()) {
			this.error('Start Block cannot have an incoming edge');
			return;
		}
		if(sourceViewNode.type === GraphConfig.NodeTypes.end.typeText.toLowerCase()){
			this.error('End Block cannot have an outgoing edge!');
			return;
		}
		if(targetViewNode.inEdge !== null){
			this.error('This node already has an incoming edge!');
		}
		let type;
		const viewEdge = {
			id: this.state.nextEdgeId,
			source: sourceViewNode[NODE_KEY],
			target: targetViewNode[NODE_KEY],
		};
		if(sourceViewNode.type === GraphConfig.NodeTypes.decision.typeText.toLowerCase()){
			if(sourceViewNode.outEdge !== null && sourceViewNode.falseEdge !== null) {
				this.error('A Decision node can have only 2 outgoing edges!');
				return;
			}
			if(sourceViewNode.outEdge === null){
				type = 'trueEdge';
				sourceViewNode.outEdge = viewEdge.id;
			} else if(sourceViewNode.falseEdge === null){
				type = 'falseEdge';
				sourceViewNode.falseEdge = viewEdge.id;
			}
		} else {
			if(sourceViewNode.outEdge !== null){
				this.error('This node already has outgoing edge!');
				return;
			}
			type = EMPTY_EDGE_TYPE;
			sourceViewNode.outEdge = viewEdge.id;
		}
		targetViewNode.inEdge = viewEdge.id;
		viewEdge['type'] = type;

		graph.edges.push(viewEdge);
		this.setState({
			graph: graph,
			nextEdgeId: this.state.nextEdgeId+1
		});
	};

	//TODO: implement logic to check if swap is allowed.
	// Called when an edge is reattached to a different target.
	onSwapEdge = (sourceViewNode, targetViewNode, viewEdge) => {
		this.error('Swapping edges functionality is currently unavailable. Sorry!');
		return;
	};

	// Called when an edge is deleted
	onDeleteEdge = viewEdge => {
		const graph = this.state.graph;
		const i = this.getEdgeIndex(viewEdge);

		const sourceNode = this.getViewNode(viewEdge.source);
		const targetNode = this.getViewNode(viewEdge.target);
		//TODO: implement logic for what happens if node is decision node;
		sourceNode.outEdge = null;
		targetNode.inEdge = null;

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
						/>
						<JSONWindow
							isVisible={this.state.windows.json}
							graph={this.state.graph}
						/>
						<ConsoleWindow
							isVisible={this.state.windows.console}
						/>
						<NodeEditWindow
							isVisible={this.state.windows.node}
							node={this.state.selected}
						/>

						<EditorController
							windows={this.state.windows}
							onWindowToggle={this.onWindowToggle.bind(this)}
							canEditNode={this.state.canEditNode}
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
							addNodeOnDrop={this.addNodeOnDrop.bind(this)}
						/>
					</div>
				</div>

			</main>
		);
	}
}

export default DragDropContext(HTML5Backend)(App);

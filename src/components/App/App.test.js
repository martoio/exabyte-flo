import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App/>, div);
	ReactDOM.unmountComponentAtNode(div);
});

describe('graph tests', () => {
	const wrapper = Enzyme.shallow(<App />);
	beforeEach(()=>{
		wrapper.setState({
			"windows":{
				"library":true,
				"json":true,
				"console":false,
				"node":false
			},
			"graph":{
				"nodes":[
					{
						"id":0,
						"title":"",
						"type":"begin",
						"x":0,
						"y":0,
						"outEdge":0,
						"inEdge":null
					},
					{
						"id":1,
						"title":"",
						"type":"end",
						"x":-38.231478452682495,
						"y":576.7096977233887,
						"outEdge":null,
						"inEdge":1
					},
					{
						"id":2,
						"title":"",
						"type":"process",
						"x":273.8779910802841,
						"y":217.66093826293945,
						"outEdge":3,
						"inEdge":2
					},
					{
						"id":3,
						"title":"",
						"type":"decision",
						"x":-46.126819252967834,
						"y":223.42677688598633,
						"outEdge":1,
						"inEdge":0,
						"falseEdge":2
					},
					{
						"id":4,
						"title":"",
						"type":"end",
						"x":529.0169749855995,
						"y":259.463339805603,
						"outEdge":null,
						"inEdge":3
					}
				],
				"edges":[
					{
						"id":0,
						"source":0,
						"target":3,
						"type":"emptyEdge"
					},
					{
						"id":1,
						"source":3,
						"target":1,
						"type":"trueEdge"
					},
					{
						"id":2,
						"source":3,
						"target":2,
						"type":"falseEdge"
					},
					{
						"id":3,
						"source":2,
						"target":4,
						"type":"emptyEdge"
					}
				]
			},
			"selected":{
				"id":4,
				"title":"",
				"type":"end",
				"x":529.0169749855995,
				"y":259.463339805603,
				"outEdge":null,
				"inEdge":3
			},
			"blockType":"empty",
			"nextEdgeId":4,
			"nextNodeId":5,
			"lastAddedNode":4,
			"canEditNode":false
		});
	});
});
// Copyright (c) 2016 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/*
  Example config for GraphView component
*/
import React from 'react';

//Flowchart symbols
const BeginBlock = (
	<symbol viewBox="0 0 100 100" id="begin">
		<ellipse cx='50' cy='65' rx='50' ry='25' />
	</symbol>
);

const EndBlock = (
	<symbol viewBox="0 0 100 100" id="end">
		<ellipse cx='50' cy='65' rx='50' ry='25' />
	</symbol>
);

const ProcessBlock = (
	<symbol viewBox="0 0 100 100" id="process">
		<rect y="30" width="110" height="70" />
	</symbol>
);

const DecisionBlock = (
	<symbol viewBox="0 0 100 100" id="decision">
		<rect transform="translate(50 30) rotate(45)" width="50" height="50" />
	</symbol>
);

//Default shapes that Digraph example gives. Left here for reference
const EmptyShape = (
	<symbol viewBox="0 0 100 100" id="empty">
		<circle cx="50" cy="50" r="45" />
	</symbol>
);

const SpecialShape = (
	<symbol viewBox="0 0 100 100" id="special">
		<rect transform="translate(50) rotate(45)" width="70" height="70" />
	</symbol>
);

const SpecialChildShape = (
	<symbol viewBox="0 0 100 100" id="specialChild">
		<rect x="2.5" y="0" width="95" height="97.5" fill="rgba(30, 144, 255, 0.12)" />
	</symbol>
);

//EDGE SHAPES
const EmptyEdgeShape = (
	<symbol viewBox="0 0 50 50" id="emptyEdge">
		<circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
	</symbol>
);

const SpecialEdgeShape = (
	<symbol viewBox="0 0 50 50" id="specialEdge">
		<rect transform="rotate(45)"  x="25" y="-4.5" width="15" height="15" fill="currentColor" />
	</symbol>
);
//TODO: Figure out what the hell viewBox does....
const Shapes = {
	BeginBlock: {
		id: '#begin',
		shape: (
			<symbol viewBox="0 0 100 100" id="begin">
				<ellipse cx='50' cy='65' rx='50' ry='25' />
			</symbol>
		),
		svg:(
			<svg width='100' height='50'>
				<ellipse cx='50' cy='25' rx='50' ry='25' />
			</svg>
		)
	},
	EndBlock: {
		id: '#end',
		shape: (
			<symbol viewBox="0 0 100 100" id="end">
				<ellipse cx='50' cy='45' rx='50' ry='45' />
			</symbol>
		),
		svg: (
			<svg width='100' height='50'>
				<ellipse cx='50' cy='65' rx='50' ry='25' />
			</svg>
		)
	},
	ProcessBlock: {
		id: '#process',
		shape: (
			<symbol viewBox="0 0 100 100" id="process">
				<rect y="30" width="110" height="70" />
			</symbol>
		),
		svg: (
			<svg width='80' height='50'>
				<rect width="80" height="50" />
			</svg>
		)
	},
	DecisionBlock: {
		id: '#decision',
		shape: (
			<symbol viewBox="0 0 100 100" id="decision">
				<rect transform="translate(50 30) rotate(45)" width="50" height="50" />
			</symbol>
		),
		svg: (
			<svg width='71' height='71'>
				<rect transform="translate(35.5) rotate(45)" width="50" height="50" />
			</svg>
		)
	},
	EmptyBlock: {
		id: '#empty',
		shape: (
			<symbol viewBox="0 0 100 100" id="empty">
				<circle cx="50" cy="50" r="20" />
			</symbol>
		),
		svg: (
			<svg width='20' height='20'>
				<circle cx="10" cy="10" r="10" />
			</svg>
		)
	}
};
//TODO: Refactor config
//make a Shapes object and put the shapes there and reference them here:
// shape: Shapes.EmptyShape.shape, shapeSVG: Shapes.EmptyShape.svg
export default {
	NodeKey: 'id',
	NodeTypes: {
		//default digraph example. left for reference purposes
		empty: {
			typeText: "",
			shapeId: Shapes.EmptyBlock.id,
			shape: Shapes.EmptyBlock.shape,
			shapeSVG: Shapes.EmptyBlock.svg,
			ref: 'empty'
		},
		special: {
			typeText: "Special",
			shapeId: "#special",
			shape: SpecialShape
		},
		begin: {
			typeText: "Start",
			shapeId: Shapes.BeginBlock.id,
			shape: Shapes.BeginBlock.shape,
			shapeSVG: Shapes.BeginBlock.svg
		},
		end: {
			typeText: "End",
			shapeId: Shapes.EndBlock.id,
			shape: Shapes.EndBlock.shape,
			shapeSVG: Shapes.EndBlock.svg
		},
		process: {
			typeText: "Process",
			shapeId: Shapes.ProcessBlock.id,
			shape: Shapes.ProcessBlock.shape,
			shapeSVG: Shapes.ProcessBlock.svg
		},
		decision: {
			typeText: "Decision",
			shapeId: Shapes.DecisionBlock.id,
			shape: Shapes.DecisionBlock.shape,
			shapeSVG: Shapes.DecisionBlock.svg
		}

	},
	NodeSubtypes: {
		specialChild: {
			shapeId: "#specialChild",
			shape: SpecialChildShape
		}
	},
	EdgeTypes: {
		emptyEdge: {
			shapeId: "#emptyEdge",
			shape: EmptyEdgeShape
		},
		specialEdge: {
			shapeId: "#specialEdge",
			shape: SpecialEdgeShape
		}
	},
};


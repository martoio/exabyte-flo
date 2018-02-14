import React from 'react';
import ReactJSON from 'react-json-view';

class JSONWindow extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		const EMPTY_TYPE = '';
		const SPECIAL_TYPE = '';
		const SPECIAL_CHILD_SUBTYPE = '';
		const SPECIAL_EDGE_TYPE = '';
		const EMPTY_EDGE_TYPE = '';
		let graph = {
			"nodes": [
				{
					"id": 1,
					"title": "Node A",
					"x": 258.3976135253906,
					"y": 331.9783248901367,
					"type": SPECIAL_TYPE
				},
				{
					"id": 2,
					"title": "Node B",
					"x": 593.9393920898438,
					"y": 260.6060791015625,
					"type": EMPTY_TYPE,
					"subtype": SPECIAL_CHILD_SUBTYPE
				},
				{
					"id": 3,
					"title": "Node C",
					"x": 237.5757598876953,
					"y": 61.81818389892578,
					"type": EMPTY_TYPE
				},
				{
					"id": 4,
					"title": "Node C",
					"x": 600.5757598876953,
					"y": 600.81818389892578,
					"type": EMPTY_TYPE
				}
			],
			"edges": [
				{
					"source": 1,
					"target": 2,
					"type": SPECIAL_EDGE_TYPE
				},
				{
					"source": 2,
					"target": 4,
					"type": EMPTY_EDGE_TYPE
				}
			]
		};

		let content = '';
		if (this.props.isVisible) {
			content = <div className='editor-window'>
				<ReactJSON
					src={graph}
					theme={'codeschool'}
				/>
			</div>

		}
		return (
		content
		);
		}
		}

		export default JSONWindow;
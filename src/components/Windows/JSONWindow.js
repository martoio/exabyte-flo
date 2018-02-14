import React from 'react';
import ReactJSON from 'react-json-view';

class JSONWindow extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		let content = '';
		if (this.props.isVisible) {
			content = <div className='editor-window'>
				<ReactJSON
					src={this.props.graph}
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
import React from 'react';
import ReactJSON from 'react-json-view';
import PropTypes from 'prop-types';

class JSONWindow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let content = '';
		//TODO: Remove comment after implementing test
		//If the isVisible flag is passed down,
		//the content is set to a <ReactJSON> component
		if (this.props.isVisible) {
			content = (
				<ReactJSON
					src={this.props.graph}
					theme={'codeschool'}
				/>
			);
		}
		return (
			//TODO: Remove comment after implementing test
			//div.editor-window gets rendered always
			<div className='editor-window'>
				{content}
			</div>

		);
	}
}

export default JSONWindow;

JSONWindow.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	graph: PropTypes.shape({
		nodes: PropTypes.array.isRequired,
		edges: PropTypes.array.isRequired
	}).isRequired
};
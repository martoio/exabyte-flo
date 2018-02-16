import React from 'react';

class NodeEditWindow extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let content = '';
		if(this.props.isVisible){
			content = (
				<div className='editor-window'>
					TODO: NODE EDIT HERE
				</div>
			);
		}
		return(
			content
		);
	}
}

export default NodeEditWindow;
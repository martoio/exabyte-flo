import React from 'react';

class JSONWindow extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let content = '';
		if(this.props.isVisible){
			content = <div className='editor-window'>
				JSON HERE
			</div>
		}
		return (
			content
		);
	}
}

export default JSONWindow;
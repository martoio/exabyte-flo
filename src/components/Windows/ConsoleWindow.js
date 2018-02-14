import React from 'react';

class ConsoleWindow extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let content = '';
		if(this.props.isVisible){
			content = <div className='editor-window'>
				TODO: CONSOLE HERE
			</div>
		}
		return(
			content
		);
	}
}

export default ConsoleWindow;
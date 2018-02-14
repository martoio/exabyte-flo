import React from 'react';

class LibraryWindow extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let content = '';
		if(this.props.isVisible){
			content = <div className='editor-window'>
				LIBRARY HERE
			</div>
		}
		return(
			content
		);
	}
}

export default LibraryWindow;
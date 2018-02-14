import React from 'react';

class LibraryWindow extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let content = '';
		if(this.props.isVisible){
			content = (
				<div className='editor-window'>
					<div className="library-blocks">
						<div className="block">
							<svg width='120' height='90'>
								<ellipse cx='60' cy='50' rx='50' ry='25' fill='#ccc'/>
							</svg>
							<p>Begin</p>
						</div>
						<div className="block">
							<svg width='120' height='90'>
								<ellipse cx='60' cy='50' rx='50' ry='25' fill='#ccc'/>
							</svg>
							<p>End</p>
						</div>
						<div className="block">
							<svg width='120' height='90'>
								<rect x="5" y="30" width="110" height="70" fill='#ccc'/>
							</svg>
							<p>Process</p>
						</div>
						<div className="block">
							<svg width='120' height='90'>
								<rect transform="translate(58 20) rotate(45)" width="50" height="50" />
							</svg>
							<p>Decision</p>

						</div>
					</div>
				</div>
			);
		}
		return(
			content
		);
	}
}

export default LibraryWindow;
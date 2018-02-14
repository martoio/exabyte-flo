import React, {Component} from 'react';
import './EditorController.css';

class EditorController extends Component {
	constructor(props){
		super(props);
		this.onWindowToggle = props.onWindowToggle;
	}


	render(){
		console.log(this.props);
		return(
			<div className="Editor-controller">
				{/*Library button*/}
				<button onClick={ () => { this.onWindowToggle('library') }}>
					<i
						className={"fas fa-folder" + ( (this.props.windows.library) ? ' active' : '')}
						title="Flowchart Library"
					/>
				</button>
				{/*Json viewer button*/}
				<button onClick={this.onWindowToggle.bind(this, 'json')}>
					<i
						className={"fas fa-code" + ( (this.props.windows.json) ? ' active' : '')}
						title="JSON representation"
					/>
				</button>
				{/*Console window button*/}
				<button onClick={this.onWindowToggle.bind(this, 'console')}>
					<i
						className={"fas fa-terminal" + ( (this.props.windows.console) ? ' active' : '')}
						title="Console"
					/>
				</button>

			</div>
		);
	}
}

export default EditorController;
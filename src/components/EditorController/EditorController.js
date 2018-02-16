import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './EditorController.css';

class EditorController extends Component {
	constructor(props) {
		super(props);
		this.onWindowToggle = props.onWindowToggle;
	}


	render() {
		return (
			<div className="Editor-controller">
				{/*Library button*/}
				<button onClick={() => {
					this.onWindowToggle('library')
				}}>
					<i
						className={"fas fa-folder" + ( (this.props.windows.library) ? ' active' : '')}
						title="Flowchart Library"
					/>
				</button>
				{/*Json viewer button*/}
				<button onClick={() => {
					this.onWindowToggle('json')
				}}>
					<i
						className={"fas fa-code" + ( (this.props.windows.json) ? ' active' : '')}
						title="JSON representation"
					/>
				</button>
				{/*Console window button*/}
				<button onClick={() => {
					this.onWindowToggle('console')
				}}>
					<i
						className={"fas fa-terminal" + ( (this.props.windows.console) ? ' active' : '')}
						title="Console"
					/>
				</button>
				<button disabled={!this.props.canEditNode} onClick={() => {
					this.onWindowToggle('node')
				}}>
					<i
						className={"fas fa-edit" + ( (this.props.canEditNode) ? ' canEdit' : ' noEdit')}
					/>
				</button>

			</div>
		);
	}
}

EditorController.propTypes = {
	onWindowToggle: PropTypes.func.isRequired,
	windows: PropTypes.shape({
		library: PropTypes.bool,
		json: PropTypes.bool,
		console: PropTypes.bool,
		node: PropTypes.bool
	}).isRequired,
	canEditNode: PropTypes.bool
};
EditorController.defaultProps = {
	windows: {
		library: true,
		json: true,
		console: false,
		node: false
	},
	canEditNode: false
};

export default EditorController;
import React, {Component} from 'react';
import './App.css';

import EditorController from "../EditorController/EditorController";

class App extends Component {
	constructor(){
		super();
		this.state = {
			windows: {
				library: true,
				json: true,
				console: false
			},
		};
	}

	onWindowToggle(win){
		let update = this.state.windows;
		update[win] = !this.state.windows[win];
		this.setState(update);
	}

	render() {
		return (
			<main>
				<header className="Flo-header">
					<h1>Flo</h1>
				</header>
				<div className="Flo-content">
					<div className='Flo-left-pane'>

						<div className='editor-window' id="lib-window">
							Library HERE
						</div>
						<div className='editor-window' id="json-window">
							JSON HERE
						</div>
						<div className='editor-window' id="console-window">
							Console HERE
						</div>
						<EditorController
							windows={this.state.windows}
							onWindowToggle={this.onWindowToggle.bind(this)}
						/>
					</div>
					<div id='right-pane'>
						<div id="flowchart-window">
							FLOWCHART HERE
						</div>
					</div>
				</div>

			</main>
		);
	}
}

export default App;

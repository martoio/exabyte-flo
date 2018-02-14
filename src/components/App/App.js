import React, {Component} from 'react';
import './App.css';

import EditorController from "../EditorController/EditorController";
import LibraryWindow from "../Windows/LibraryWindow";
import ConsoleWindow from "../Windows/ConsoleWindow";
import JSONWindow from "../Windows/JSONWindow";
import Graph from "../Flowchart/Graph";

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
		let w = this.state.windows;
		const hasWindows = w.library || w.json || w.console;
		return (
			<main>
				<header className="Flo-header">
					<h1>Flo</h1>
				</header>
				<div className="Flo-content">
					<div className='Flo-left-pane'>
						{!hasWindows > 0 &&
						<div className='window-holder'>
							<i class="fas fa-edit"></i>
						</div>
						}
						<LibraryWindow
							isVisible={this.state.windows.library}
						/>
						<JSONWindow
							isVisible={this.state.windows.json}
						/>
						<ConsoleWindow
							isVisible={this.state.windows.console}
						/>
						<EditorController
							windows={this.state.windows}
							onWindowToggle={this.onWindowToggle.bind(this)}
						/>
					</div>
					<div className='Flo-right-pane'>
							<Graph/>
					</div>
				</div>

			</main>
		);
	}
}

export default App;

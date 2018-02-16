import React from 'react';
import {Accordion, Icon} from 'semantic-ui-react';
import FlowBlock from './FlowBlock';

class LibraryWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0
		};
	}

	handleClick(e, titleProps) {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;
		this.setState({
			activeIndex: newIndex
		});
	}

	render() {
		let content = '';
		const {activeIndex} = this.state;
		if (this.props.isVisible) {
			content = (
				<div className='editor-window'>
					<Accordion fluid styled>
						<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick.bind(this)}>
							<Icon name='dropdown'/>
							Generic Block

						</Accordion.Title>
						<Accordion.Content active={activeIndex === 0}>
							<FlowBlock/>
						</Accordion.Content>

						<Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick.bind(this)}>
							<Icon name='dropdown'/>
							Math Blocks
						</Accordion.Title>
						<Accordion.Content active={activeIndex === 1}>
						</Accordion.Content>
						<Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick.bind(this)}>
							<Icon name='dropdown'/>
							Decision Blocks
						</Accordion.Title>
						<Accordion.Content active={activeIndex === 2}>
						</Accordion.Content>

					</Accordion>
				</div>
			);
		}
		return (
			content
		);
	}
}

export default LibraryWindow;
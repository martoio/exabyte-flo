import React from 'react';
import {Accordion, Icon} from 'semantic-ui-react';
import FlowBlock from './FlowBlock';
import GraphConfig from '../../Flowchart/graph-config';

const libMenu = {
	'Generic Blocks': [
		GraphConfig.NodeTypes.empty,
		GraphConfig.NodeTypes.begin,
		GraphConfig.NodeTypes.end
	],
	'Process Blocks': [
		GraphConfig.NodeTypes.process
	],
	'Decision Blocks': [
		GraphConfig.NodeTypes.decision
	]
};


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
			let accordionContent = [], index = 0;
			for(let accordionTitle in libMenu){
				accordionContent.push(
					<Accordion.Title key={'ac-title-'+index} active={activeIndex === index} index={index} onClick={this.handleClick.bind(this)}>
						<Icon key={'ac-title-icon-'+index} name='dropdown'/>
						{accordionTitle}
					</Accordion.Title>
				);
				libMenu[accordionTitle].forEach((block) => {
					accordionContent.push(
						<Accordion.Content key={block.shapeId} active={activeIndex === index}>
							<FlowBlock key={'block-'+block.shapeId} name={block.typeText}>
								{block.shapeSVG}
							</FlowBlock>
						</Accordion.Content>
					);
				});



				index++;
			}
			content = (
				<div className='editor-window'>
					<Accordion fluid styled>
						{accordionContent}
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
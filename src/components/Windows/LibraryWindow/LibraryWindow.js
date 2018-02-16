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
					<Accordion.Title
						key={'ac-title-'+index}
						active={activeIndex === index}
						index={index}
						onClick={this.handleClick.bind(this)}
					>
						<Icon key={'ac-title-icon-'+index} name='dropdown'/>
						{accordionTitle}
					</Accordion.Title>
				);
				let blocks = [];
				//using traditional for-loop instead of .forEach to avoid
				//es-lint warning no-loop-func;
				for(let i = 0; i < libMenu[accordionTitle].length; i++){
					let block = libMenu[accordionTitle][i];
					blocks.push(
						<FlowBlock key={'block-'+block.shapeId} shapeId={block.shapeId} name={block.typeText}>
							{block.shapeSVG}
						</FlowBlock>
					);

				}
				accordionContent.push(
					<Accordion.Content key={'ac-content-'+index} active={activeIndex === index}>
						{blocks}
					</Accordion.Content>
				);
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
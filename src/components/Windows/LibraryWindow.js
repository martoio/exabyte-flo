import React from 'react';
import {Accordion, Icon} from 'semantic-ui-react';

class LibraryWindow extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0
		};
	}
	handleClick(e, titleProps){
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
							<Icon name='dropdown' />
							Generic Block
						</Accordion.Title>
						<Accordion.Content active={activeIndex === 0}>
							<p>
								A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
								{' '}welcome guest in many households across the world.
							</p>
						</Accordion.Content>

						<Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick.bind(this)}>
							<Icon name='dropdown' />
							Math Blocks
						</Accordion.Title>
						<Accordion.Content active={activeIndex === 1}>
							<p>
								There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
								{' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
							</p>
						</Accordion.Content>
						<Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick.bind(this)}>
							<Icon name='dropdown' />
							Math Blocks
						</Accordion.Title>
						<Accordion.Content active={activeIndex === 2}>
							<p>
								There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
								{' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
							</p>
						</Accordion.Content>

					</Accordion>


					<div className="library-blocks">
						<div className="block" onClick={() => {
							this.props.changeBlockType('begin')
						}}>
							<svg width='120' height='90'>
								<ellipse cx='60' cy='50' rx='50' ry='25' fill='#ccc'/>
							</svg>
							<p>Begin</p>
						</div>
						<div className="block" onClick={() => {
							this.props.changeBlockType('end')
						}}>
							<svg width='120' height='90'>
								<ellipse cx='60' cy='50' rx='50' ry='25' fill='#ccc'/>
							</svg>
							<p>End</p>
						</div>
						<div className="block" onClick={() => {
							this.props.changeBlockType('process')
						}}>
							<svg width='120' height='90'>
								<rect x="5" y="30" width="110" height="70" fill='#ccc'/>
							</svg>
							<p>Process</p>
						</div>
						<div className="block" onClick={() => {
							this.props.changeBlockType('decision')
						}}>
							<svg width='120' height='90'>
								<rect transform="translate(58 20) rotate(45)" width="50" height="50"/>
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
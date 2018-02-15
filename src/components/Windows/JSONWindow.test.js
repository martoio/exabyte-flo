import React from 'react';
import Enzyme from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import JSONWindow from './JSONWindow';
import ReactJSON from 'react-json-view';

Enzyme.configure({adapter: new Adapter()});

describe('JSONWindow', () => {
	let props;
	let mountedJSONWindow;

	const jsonWindow = () => {
		if (!mountedJSONWindow) {
			mountedJSONWindow = Enzyme.shallow(<JSONWindow/>);
		}
		return mountedJSONWindow;
	};

	beforeEach(() => {
		props = {
			isVisible: undefined,
			graph: undefined
		}
	});

	it('always renders a div', () => {
		const divs = jsonWindow().find('div');
		expect(divs).to.have.length(1);
	});

	describe('the rendered div', () => {
		it('has a class of `editor-window` ', () => {
			const div = jsonWindow().find('div.editor-window');
			expect(div).to.have.length(1);
		});
	});

	describe('when `isVisible` is true', () => {
		it('renders a `ReactJSON` component', () => {
			const jsonWindow = Enzyme.shallow(<JSONWindow />);
			jsonWindow.setProps({isVisible: true});
			expect(jsonWindow.find(ReactJSON)).to.have.length(1);
		});
	});

	describe('when `isVisible` is not true/falsy', () => {
		let jsonWindow;
		beforeEach(() => {
			jsonWindow = Enzyme.shallow(<JSONWindow/>);
			jsonWindow.setProps({isVisible: false});
		});
		it('does not render a ReactJSON element', () => {
			expect(jsonWindow.find(ReactJSON)).to.have.length(0);
		});
		it('is empty', () => {
			expect(jsonWindow.text()).to.equal('');
		});
	});

});
import React from 'react';
import Enzyme from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import EditorController from './EditorController';
Enzyme.configure({adapter: new Adapter()});

describe('EditorController', () => {
	let editorController;
	let mockOnWindowToggle = jest.fn();
	beforeEach(() => {
		editorController = Enzyme.shallow(
			<EditorController onWindowToggle={mockOnWindowToggle}/>
		);
	});
	it('always renders a div', () => {
		const div = editorController.find('div');
		expect(div).to.have.length(1);
	});

	it('always has 3 buttons', () => {
		expect(editorController.find('button')).to.have.length(3);
	});

	describe('buttons', () => {
		it('simulate click events', () => {
			let btn = editorController.find('button').first();
			btn.simulate('click');
			expect(mockOnWindowToggle.mock.calls.length).to.equal(1);
		});
	});

});
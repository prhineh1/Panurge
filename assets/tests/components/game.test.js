import React from 'react';
import Game from '../../components/Game';
import { shallow } from 'enzyme';
import { moveTest } from '../fixtures/fixtures';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<Game />);
});

test('should render Game', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should call "concede" method', () => {
    wrapper.instance().concede();
    expect(wrapper.state('black')).toEqual({ concede: true, lost: 0});
});

test('selected method should modify canMoveTo state', () => {
    let instance = wrapper.instance();
    jest.spyOn(instance, 'selected').mockImplementation(() => instance.setState(() => ({ canMoveTo: [[4,3]], selectedPiece: [5,2] })));
    expect(wrapper.state('canMoveTo')).toEqual([[]]);
    expect(wrapper.state('selectedPiece')).toEqual([]);
    instance.selected();
    expect(wrapper.state('canMoveTo')).toEqual([[4,3]]);
    expect(wrapper.state('selectedPiece')).toEqual([5,2]);
});

test('move should have been properly called', () => {
    let instance = wrapper.instance();
    instance.setState(() => ({ selectedPiece: [5,4], canMoveTo: [[4,5], [4,3]] }));
    instance.move([4,5]);
    expect(wrapper.state('canMoveTo')).toEqual([[]]);
    expect(wrapper.state('blacksTurn')).toEqual(false);
    expect(wrapper.state('selectedPiece')).toEqual([]);
    expect(wrapper.state('boardState')).toEqual(moveTest);
});

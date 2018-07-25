import React from 'react';
import Game from '../../components/Game';
import { shallow } from 'enzyme';

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

test('selected method should modify toMoveTo state', () => {
    let instance = wrapper.instance();
    jest.spyOn(instance, 'selected').mockImplementation(() => instance.setState(() => ({ toMoveTo: [[4,3]], selectedPiece: [5,2] })));
    expect(wrapper.state('toMoveTo')).toEqual([[]]);
    expect(wrapper.state('selectedPiece')).toEqual([]);
    instance.selected();
    expect(wrapper.state('toMoveTo')).toEqual([[4,3]]);
    expect(wrapper.state('selectedPiece')).toEqual([5,2]);
});

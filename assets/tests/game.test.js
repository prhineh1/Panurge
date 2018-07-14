import React from 'react';
import Game from '../components/Game';
import { shallow } from 'enzyme';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<Game />);
});

test('should render Game', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle concede', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.state().black.concede).toBe(true);
    expect(wrapper).toMatchSnapshot();
});
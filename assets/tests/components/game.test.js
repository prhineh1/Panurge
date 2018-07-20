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

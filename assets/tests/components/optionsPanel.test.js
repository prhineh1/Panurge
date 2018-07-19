import React from 'react';
import OptionsPanel from '../../components/OptionsPanel';
import { shallow } from 'enzyme';
import { initState } from '../fixtures/fixtures';

let concede, wrapper, playerState;

beforeEach(() => {
    playerState = { red: initState.red, black: initState.black };
    concede = jest.fn();
    wrapper = shallow(<OptionsPanel players={playerState} concede={concede} turn='black' />);
});

test('should render OptionsPanel with initState', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render OptionsPanel with black win', () => {
    let blackWins = shallow(<OptionsPanel players={{...playerState, red: { ...initState.red, concede: true }}} concede={concede} />);
    expect(blackWins).toMatchSnapshot();
});

test('should render OptionsPanel with red win', () => {
    let redWins = shallow(<OptionsPanel players={{...playerState, black: { ...initState.black, concede: true }}} concede={concede} />);
    expect(redWins).toMatchSnapshot();
});

test('should handle concede', () => {
    wrapper.find('button').simulate('click');
    expect(concede).toHaveBeenCalled();
});

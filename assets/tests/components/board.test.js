import React from 'react';
import Board from '../../components/Board';
import { shallow } from 'enzyme';
import { initState } from '../fixtures/fixtures';

let wrapper, boardState, turn

beforeEach(() => {
    wrapper = shallow(<Board
        boardState={initState.boardState}
        turn={'black'}
    />);
});

test("should render Board with initState", () => {
    expect(wrapper).toMatchSnapshot();
});

//TODO: write tests for 'selected' cases
import React from 'react';
import Board from '../../components/Board';
import { shallow } from 'enzyme';
import { initState } from '../fixtures/fixtures';

let wrapper, selected, move
selected = jest.fn();
move = jest.fn();

test("should render Board with initState", () => {
    wrapper = shallow(<Board
        boardState={initState.boardState}
        turn={'black'}
        selected={selected}
        canMoveTo={[[4,1]]}
        move={move}
    />);
    expect(wrapper).toMatchSnapshot();
});

test("should render Board on red's turn", () => {
    wrapper = shallow(<Board
        boardState={initState.boardState}
        turn={'red'}
        selected={selected}
        canMoveTo={[[3,6]]}
        move={move}
    />);
    expect(wrapper).toMatchSnapshot();
});
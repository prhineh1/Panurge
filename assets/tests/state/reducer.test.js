import reducer from '../../state/reducer';
import { initState } from '../fixtures/fixtures';

test('should concede for red', () => {
    const state = reducer(initState, { 
        type: 'CONCEDE',
        player: 'red'
    });
    expect(state).toEqual({
        ...initState,
        red: {
            ...initState.red,
            concede: true
        }
    });
});

test('should select a piece for black', () => {
    const state = reducer(initState, {
        type: 'SELECT_PIECE',
        board: initState.boardState,
        coord: [5,0],
        player: 'b'
    });
    expect(state).toEqual({
        ...initState,
        canMoveTo: [[4, 1]],
        selectedPiece: [5, 0]
    });
});

test('should select a piece for black', () => {
    const state = reducer(initState, {
        type: 'MOVE_PIECE',
        toCoords: [4,2],
        board: initState.boardState,
        selectedPiece: [5,0],
        player: 'b'
    });

    initState.boardState[4][2] = 'b';
    initState.boardState[5][0] = 1;

    expect(state).toEqual({
        ...initState,
        canMoveTo: [[]],
        selectedPiece: [],
        blacksTurn: !initState.blacksTurn
    });
});

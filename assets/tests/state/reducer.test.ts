import reducer from '../../state/reducer';
import { initState } from '../fixtures/fixtures';
import { ActionType, ReducerAction, Concede, SelectPiece, MovePiece } from '../../types';

test('should concede for red', () => {
    const concede: Concede = {
        activePlayer: 'red'
    };
    const action: ReducerAction = {
        type: ActionType.CONCEDE,
        concede,
    };
    const state = reducer(initState, action);
    expect(state).toEqual({
        ...initState,
        red: {
            ...initState.red,
            concede: true
        }
    });
});

test('should select a piece for black', () => {
    const selectPiece: SelectPiece = {
        board: initState.boardState,
        selectedPiece: [5,0],
        coordContent: 'b'
    };
    const action: ReducerAction = {
        type: ActionType.SELECT_PIECE,
        selectPiece
    };
    const state = reducer(initState, action);
    expect(state).toEqual({
        ...initState,
        canMoveTo: [[4, 1]],
        selectedPiece: [5, 0]
    });
});

test('should move a piece for black', () => {
    const movePiece: MovePiece = {
        board: initState.boardState,
        moveToCoord: [4,2],
        selectedPiece: [5,0],
        coordContent: 'b'
    };
    const action: ReducerAction = {
        type: ActionType.MOVE_PIECE,
        movePiece
    };
    const state = reducer(initState, action);

    initState.boardState[4][2] = 'b';
    initState.boardState[5][0] = 1;

    expect(state).toEqual({
        ...initState,
        canMoveTo: [[]],
        selectedPiece: [],
        blacksTurn: !initState.blacksTurn
    });
});

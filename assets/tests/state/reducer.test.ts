import reducer from '../../state/reducer';
import { initState, mixedBoard } from '../fixtures/fixtures';
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
        canMoveTo: [{
            coords: [4,1],
            attack: [],
        }],
        selectedPiece: [5, 0]
    });
});

test('should move a piece for black', () => {
    const movePiece: MovePiece = {
        board: initState.boardState,
        moveToCoord: [{
            coords: [4,1],
            attack: [],
        }],
        selectedPiece: [5,0],
        coordContent: 'b'
    };
    const action: ReducerAction = {
        type: ActionType.MOVE_PIECE,
        movePiece
    };
    const state = reducer(initState, action);

    initState.boardState[4][1] = 'b';
    initState.boardState[5][0] = 1;

    expect(state).toEqual({
        ...initState,
        canMoveTo: [],
        selectedPiece: [],
        blacksTurn: !initState.blacksTurn,
        attacked: false,
    });
});

test('should move a piece for red', () => {
    const movePiece: MovePiece = {
        board: mixedBoard,
        moveToCoord: [{
            coords: [5,0],
            attack: [4,1]
        }],
        selectedPiece: [3,2],
        coordContent: 'r'
    };
    const action: ReducerAction = {
        type: ActionType.MOVE_PIECE,
        movePiece
    };
    const state = reducer({ ...initState, boardState: mixedBoard, blacksTurn: false }, action);

    mixedBoard[5][0] = 'r';
    mixedBoard[4][1] = 1;
    mixedBoard[3][2] = 1;
    expect(state).toEqual({
        ...initState,
        boardState: mixedBoard,
        canMoveTo: [],
        selectedPiece: [],
        blacksTurn: true,
        attacked: true
    });
});

test('should move a piece for black plus another turn', () => {
    const movePiece: MovePiece = {
        board: mixedBoard,
        moveToCoord: [{
            coords: [2,3],
            attack: [3,2]
        }],
        selectedPiece: [4,1],
        coordContent: 'b'
    };
    const action: ReducerAction = {
        type: ActionType.MOVE_PIECE,
        movePiece
    };
    const state = reducer({ ...initState, boardState: mixedBoard }, action);

    mixedBoard[2][3] = 'b';
    mixedBoard[4][1] = 1;
    mixedBoard[3][2] = 1;
    expect(state).toEqual({
        ...initState,
        boardState: mixedBoard,
        canMoveTo: [],
        selectedPiece: [],
        blacksTurn: true,
        attacked: true
    });
});

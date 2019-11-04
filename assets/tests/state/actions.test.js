import { concede, selectPiece, movePiece } from '../../state/actions';
import { initState } from '../fixtures/fixtures'

test('should setup concede object', () => {
    const action = concede('red');
    expect(action).toEqual({
        type: 'CONCEDE',
        player: 'red'
    });
});

test('should setup selectPiece object', () => {
    const action = selectPiece(initState.boardState, [2,1], 'r');
    expect(action).toEqual({
        type: 'SELECT_PIECE',
        board: initState.boardState,
        coord: [2,1],
        player: 'r'
    });
});

test('should setup movePiece object', () => {
    const action = movePiece(initState.boardState, [4,2], [5,0], 'b');
    expect(action).toEqual({
        type: 'MOVE_PIECE',
        toCoords: [4,2],
        board: initState.boardState,
        selectedPiece: [5,0],
        player: 'b'
    });
});
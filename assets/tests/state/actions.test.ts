import { Concede, ReducerActionProps, SelectPiece, MovePiece, Move } from '../../types';
import { concede, selectPiece, movePiece } from '../../state/actions';
import { initState } from '../fixtures/fixtures'

test('should setup concede object', () => {
    const conceceObject: Concede = {
        activePlayer: 'red'
    };
    const props: ReducerActionProps = {
        concede: conceceObject
    }
    const action = concede(props);
    expect(action).toEqual({
        type: 'CONCEDE',
        ...props
    });
});

test('should setup selectPiece object', () => {
    const selectObject: SelectPiece = {
        board: initState.boardState,
        selectedPiece: [2,1],
        coordContent: 'r'
    };
    const props: ReducerActionProps = {
        selectPiece: selectObject
    };
    const action = selectPiece(props);
    expect(action).toEqual({
        type: 'SELECT_PIECE',
        ...props
    });
});

test('should setup movePiece object', () => {
    const moveObject: MovePiece = {
        board: initState.boardState,
        moveToCoord: [{
            coords: [4,2],
            attack: [],
        }],
        selectedPiece: [5,0],
        coordContent: 'b'
    };
    const props: ReducerActionProps = {
        movePiece: moveObject
    };
    const action = movePiece(props);
    expect(action).toEqual({
        type: 'MOVE_PIECE',
        ...props
    });
});
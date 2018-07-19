import { movable } from '../../gameLogic/general';
import { initState } from '../fixtures/fixtures';

test('should return false for a red piece', () => {
    let val = movable(initState.boardState, [0,1], 'r');
    expect(val).toBe(false);
});

test('should return true for a red piece', () => {
    let val = movable(initState.boardState, [2,3], 'r');
    expect(val).toBe(true);
});

test('should return false for a black piece', () => {
    let val = movable(initState.boardState, [6,7], 'b');
    expect(val).toBe(false);
});

test('should return true for a black piece', () => {
    let val = movable(initState.boardState, [5,4], 'b');
    expect(val).toBe(true);
});
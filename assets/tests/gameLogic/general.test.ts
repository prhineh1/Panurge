import { movable } from '../../gameLogic/general';
import { initState, mixedBoard } from '../fixtures/fixtures';

let val;

test('should return [] for a red piece', () => {
    val = movable(mixedBoard, [7,2], 'r');
    expect(val).toEqual([[]]);
});

test('should return [] for a red piece', () => {
    val = movable(initState.boardState, [0,1], 'r');
    expect(val).toEqual([[]]);
});

test('should return two values for a red piece', () => {
    val = movable(initState.boardState, [2,3], 'r');
    expect(val).toEqual([[3, 4], [3, 2]]);
});

test('should return one value for a red piece', () => {
    val = movable(mixedBoard, [0,0], 'r');
    expect(val).toEqual([[1, 1]]);
});

test('should return one value for a red piece', () => {
    val = movable(mixedBoard, [4,7], 'r');
    expect(val).toEqual([[5, 6]]);
});

test('should return [] for a black piece', () => {
    val = movable(mixedBoard, [0, 3], 'b');
    expect(val).toEqual([[]]);
});

test('should return [] for a black piece', () => {
    let val = movable(initState.boardState, [6,7], 'b');
    expect(val).toEqual([[]]);
});

test('should return two values for a black piece', () => {
    let val = movable(initState.boardState, [5,4], 'b');
    expect(val).toEqual([[4, 5], [4, 3]]);
});

test('should return one for a black piece', () => {
    let val = movable(mixedBoard, [2,0], 'b');
    expect(val).toEqual([[1, 1]]);
});

test('should return two values for a black piece', () => {
    let val = movable(mixedBoard, [2,7], 'b');
    expect(val).toEqual([[1,6]]);
});
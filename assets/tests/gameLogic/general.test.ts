import { movable } from '../../gameLogic/general';
import { mixedBoard } from '../fixtures/fixtures';

let val;

test('should return no moves for red', () => {
    val = movable(mixedBoard, [7,2], 'r');
    expect(val).toEqual([]);
});

test('should return one move for red', () => {
    val = movable(mixedBoard, [0,0], 'r');
    const moves = [{
        coords: [1,1],
        attack: []
    }];
    expect(val).toEqual(moves);
});

test('should return one move for black', () => {
    val = movable(mixedBoard, [6,7], 'b');
    const moves =[{
        coords: [5,6],
        attack: []
    }];
    expect(val).toEqual(moves);
});

test('should return one move and one attack for red', () => {
    val = movable(mixedBoard, [3,2], 'r');
    const moves = [{
        coords: [4,3],
        attack: []
    }, {
        coords: [5,0],
        attack: [4,1]
    }];
    expect(val).toEqual(moves);
});

test('should return one move and one attack for black', () => {
    val = movable(mixedBoard, [2,4], 'b');
    const moves = [{
        coords: [0,6],
        attack: [1,5]
    }, {
        coords: [1,3],
        attack: []
    }];
    expect(val).toEqual(moves);
});

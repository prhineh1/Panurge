import { GameState, coordContent } from "../../types";

export const initState: GameState = {
    red: { concede: false, lost: 12},
    black: { concede: false, lost: 12},
    blacksTurn: true,
    canMoveTo: [],
    selectedPiece: [5,4],
    boardState: [
                    [1, 'r', 1, 'r', 1, 'r', 1, 'r'],
                    ['r', 1, 'r', 1, 'r', 1, 'r', 1],
                    [1, 'r', 1, 'r', 1, 'r', 1, 'r'],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    ['b', 1, 'b', 1, 'b', 1, 'b', 1],
                    [1, 'b', 1, 'b', 1, 'b', 1, 'b'],
                    ['b', 1, 'b', 1, 'b', 1, 'b', 1]
                ],
    attacked: false,
};

export const moveTest: coordContent[][] = [
    [1, 'r', 1, 'r', 1, 'r', 1, 'r'],
    ['r', 1, 'r', 1, 'r', 1, 'r', 1],
    [1, 'r', 1, 'r', 1, 'r', 1, 'r'],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 'b', 1, 1],
    ['b', 1, 'b', 1, 1, 1, 'b', 1],
    [1, 'b', 1, 'b', 1, 'b', 1, 'b'],
    ['b', 1, 'b', 1, 'b', 1, 'b', 1]
]

export const mixedBoard: coordContent[][] = [
    ['r', 1, 1, 'b', 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 'r', 1, 1],
    ['b', 1, 1, 1, 'b', 1 , 1, 'b'],
    [1, 1, 'r', 1, 1, 1, 1, 1],
    ['r', 'b', 1, 1, 1, 1, 1, 'r'],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 'r', 1, 1, 1, 'b'],
    [1, 1, 'r', 1, 1, 1, 1, 1]
];

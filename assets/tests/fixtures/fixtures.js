export const initState = {
    red: { concede: false, lost: 0},
    black: { concede: false, lost: 0},
    blacksTurn: true,
    boardState: [
                    [1, 'r', 1, 'r', 1, 'r', 1, 'r'],
                    ['r', 1, 'r', 1, 'r', 1, 'r', 1],
                    [1, 'r', 1, 'r', 1, 'r', 1, 'r'],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    ['b', 1, 'b', 1, 'b', 1, 'b', 1],
                    [1, 'b', 1, 'b', 1, 'b', 1, 'b'],
                    ['b', 1, 'b', 1, 'b', 1, 'b', 1]
                ]
};
import { concede } from '../../state/actions';

test('should setup concede object', () => {
    const action = concede('red');
    expect(action).toEqual({
        type: 'CONCEDE',
        player: 'red'
    });
});
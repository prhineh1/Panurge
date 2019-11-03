import reducer from '../../state/reducer';
import { initState } from '../fixtures/fixtures';

test('should concede for red player', () => {
    const state = reducer(initState, { 
        type: 'CONCEDE',
        player: 'red'
    });
    expect(state).toEqual({
        ...initState,
        red: {
            ...initState.red,
            concede: true
        }
    });
});

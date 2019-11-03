const reducer = (state, action) => {
    switch(action.type) {
        case 'CONCEDE':
            return {
                ...state,
                [action.player]: {
                    ...state[action.player],
                    concede: true
                }
            }
        default:
            return state;
    }   
}

export default reducer;
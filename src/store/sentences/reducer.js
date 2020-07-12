let initialState = {
    sentences: [],
}
export default function counter(state, action) {
    switch(action.type) {
        case 'SET_SENTENCES': {
            return {
                ...state,
                sentences: action.payload.sentences
            }
        }
        default:
            return initialState;
    }
}

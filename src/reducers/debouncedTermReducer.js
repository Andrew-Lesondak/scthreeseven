import { DEBOUNCED_TERM } from '../constants';

const debouncedTermReducer = (state = '', action) => {
    switch(action.type) {
        case DEBOUNCED_TERM:
            return action.payload;
        default:
            return state;
    }
}

export default debouncedTermReducer;
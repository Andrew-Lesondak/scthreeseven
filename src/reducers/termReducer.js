import { TERM } from '../constants';

const termReducer = (state = '', action) => {
    switch(action.type) {
        case TERM:
            return action.payload;
        default:
            return state;
    }
}

export default termReducer;
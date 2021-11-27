import { FILTERED_HASH_TAGS, CLEAR_FILTERED } from '../constants';

const filteredHashtagsReducer = (state = [], action) => {
    switch(action.type) {
        case FILTERED_HASH_TAGS:
            return action.payload;
        case CLEAR_FILTERED:
            return [];
        default:
            return state;
    }
}

export default filteredHashtagsReducer;
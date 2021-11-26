import { FILTERED_HASH_TAGS } from '../constants';

const filteredHashtagsReducer = (state = [], action) => {
    switch(action.type) {
        case FILTERED_HASH_TAGS:
            return action.payload;
        default:
            return state;
    }
}

export default filteredHashtagsReducer;
import { POPULAR_POSTS } from '../constants';

const popularPostsReducer = (state = [], action) => {
    switch(action.type) {
        case POPULAR_POSTS:
            return action.payload;
        default:
            return state;
    }
}

export default popularPostsReducer;
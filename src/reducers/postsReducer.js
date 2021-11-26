import { POSTS } from '../constants';

const postsReducer = (state = [], action) => {
    switch(action.type) {
        case POSTS:
            return action.payload;
        default:
            return state;
    }
}

export default postsReducer;
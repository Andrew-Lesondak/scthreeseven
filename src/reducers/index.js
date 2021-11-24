import { combineReducers } from 'redux';
import popularPostsReducer from './popularPostsReducer';

export default combineReducers({
    posts: popularPostsReducer
});
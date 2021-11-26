import { combineReducers } from 'redux';
import popularPostsReducer from './popularPostsReducer';
import termReducer from './termReducer';
import debouncedTermReducer from './debouncedTermReducer';

export default combineReducers({
    posts: popularPostsReducer,
    term: termReducer,
    debouncedTerm: debouncedTermReducer
});
import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import termReducer from './termReducer';
import debouncedTermReducer from './debouncedTermReducer';
import filteredHashtagsReducer from './filteredHashtagsReducer';

export default combineReducers({
    posts: postsReducer,
    term: termReducer,
    debouncedTerm: debouncedTermReducer,
    filteredHashTags: filteredHashtagsReducer
});
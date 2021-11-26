import '../style/Search.scss';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';

function Search() {

    const term = useSelector(state => state.term);
    const debouncedTerm = useSelector(state => state.term);
    const dispatch = useDispatch();

    useEffect(() => {
        const timerId = setTimeout(() => {
              dispatch(allActions.setDebouncedTerm(term));
        }, 500);
        
        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    useEffect(() => {
        (async () => {
          if(debouncedTerm) {
            dispatch(await allActions.fetchPosts(debouncedTerm));
          }
        })();

    }, [debouncedTerm]);

  return (
    <div>
      <span className="search-bar">
        <input
            placeholder="Search by keyword"
            className="search-input"
            type="text"
            value={term}
            onChange={e => dispatch(allActions.setTerm(e.target.value))}
            />
      </span>
    </div>
  );
}

export default Search;

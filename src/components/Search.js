import '../style/Search.scss';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';

function Search() {

  const term = useSelector(state => state.term);
  const debouncedTerm = useSelector(state => state.term);
  const currentFilteredTags = useSelector(state => state.filteredHashTags);
  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(allActions.setDebouncedTerm(term));
    }, 500);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [term, dispatch]);

  useEffect(() => {
    (async () => {
      if(debouncedTerm) {
        dispatch(await allActions.fetchPosts(debouncedTerm));
      }
    })();

  }, [debouncedTerm, dispatch]);

  return (
    <div className="search">
      <span className="search-bar">
        <input
          placeholder="Search by keyword"
          className="search-input"
          type="text"
          value={term}
          onChange={async e => { 
            dispatch(allActions.setTerm(e.target.value)); 
            e.target.value === '' && await dispatch(allActions.filterHashtags(e.target.value, currentFilteredTags)); 
          }}
        />
      </span>
    </div>
  );
};

export default Search;

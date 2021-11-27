import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import '../style/Title.scss';

function LoadMore() {

  const dispatch = useDispatch();
  const debouncedTerm = useSelector(state => state.term);
  const posts = useSelector(state => state.posts);
  
  const showLoadMore = (tweets, debouncedTerm) => {
    return debouncedTerm !== '' &&
      <div 
        className="load-more">
          <div
            className="load-more-text"
            onClick={async e => {
              if(debouncedTerm !== '') {
                  dispatch(
                  await allActions.fetchPosts(debouncedTerm, 
                  tweets, 
                  `&max_id=${tweets.map(tweet => tweet.tweetId).reduce((a,b) => Math.min(a, b))}`))
                }
              }
            }>
              Load more
            </div>
      </div>
  }

  const getContent = (tweets) => {
    return tweets.length > 0 &&
      showLoadMore(tweets, debouncedTerm)
  }

  return (
    getContent(posts)
  );
}

export default LoadMore;

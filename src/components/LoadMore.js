import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import '../style/Title.scss';

function LoadMore() {

  const dispatch = useDispatch();
  const debouncedTerm = useSelector(state => state.term);
  const posts = useSelector(state => state.posts);
  
  const getContent = (tweets) => {
    if(tweets.length) {
      return (
        <div>
          <div 
            className="load-more"
            onClick={async e => 
                  dispatch(
                  await allActions.fetchPosts(debouncedTerm, 
                  tweets, 
                  `&max_id=${tweets.map(tweet => tweet.tweetId).reduce((a,b) => Math.min(a, b))}`))}
              >
              Load more
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
    
  }

  return (
    getContent(posts)
  );
}

export default LoadMore;

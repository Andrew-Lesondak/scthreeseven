import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import '../style/Title.scss';

function LoadMore() {

  const dispatch = useDispatch();
  const debouncedTerm = useSelector(state => state.term);
  const { posts, loadMoreText } = useSelector(state => state.tweetData);

  const showLoadMore = (tweets, debouncedTerm) => {
    return (
      debouncedTerm !== '' &&
      <div className="load-more">
        <div
          className="load-more-text"
          onClick={async e => {
            !(loadMoreText.toLowerCase().includes('end')) &&
            dispatch(await allActions.fetchPosts(
              debouncedTerm,
              tweets,
              `&max_id=${tweets.map(tweet => tweet.tweetId).reduce((a,b) => Math.min(a, b))}`))
          }}>
            {loadMoreText}
        </div>
      </div>
    );
  };

  const getContent = (tweets) => {
    return tweets && tweets.length > 0 ? showLoadMore(tweets, debouncedTerm) : <div></div>;
  };

  return (
    getContent(posts)
  );
};

export default LoadMore;

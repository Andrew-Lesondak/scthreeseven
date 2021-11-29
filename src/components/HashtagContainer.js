import '../style/HashtagContainer.scss';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import _ from 'lodash';

function HashtagContainer() {

  const posts = useSelector(state => state.tweetData.posts);
  const currentFilteredTags = useSelector(state => state.filteredHashTags);
  const debouncedTerm = useSelector(state => state.term);
  const dispatch = useDispatch();

  const getHashtagHtml = (text, isFilteredTag) => {
    
    let tags = [...text.matchAll(/[#]+[A-Za-z0-9-_]+/g)];
    let hashlinks = tags.map((tag, i) => { 
      return (
        <div 
          className={`hashtag ${isFilteredTag ? 'filtered-tag' : ''}`}
          key={tag[0]}
          onClick={async e => await dispatch(allActions.filterHashtags(e.target.innerText, currentFilteredTags))}
        >
          {` ${tag[0]}`}
        </div>         
      );
    });

    return hashlinks;
  };

  const createHashtagList = (tweets, filteredTags) => {
    let tweetHashTags = tweets && tweets.map(tweet => tweet.hashTags);
    const hashTagSet = new Set(currentFilteredTags);

    return (
      _.chain(tweetHashTags)
        .flatten()
        .map(item => item[0])
        .uniq()
        .concat(currentFilteredTags)
        .uniq()
        .map(tag => getHashtagHtml(tag, hashTagSet.has(tag)))
        .value()
    );
  };

  return (
    <div className="hashtags-container">
        <div className='title'>Filter by hashtag</div>
        <div className="hashtags">
          {
            debouncedTerm !== '' && createHashtagList(posts, currentFilteredTags)
          }
        </div>
    </div>
  );
};

export default HashtagContainer;
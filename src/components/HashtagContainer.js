import '../style/HashtagContainer.scss';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import _ from 'lodash';

function HashtagContainer() {

  const posts = useSelector(state => state.posts);
  const currentFilteredTags = useSelector(state => state.filteredHashTags);
  const dispatch = useDispatch();

  const getHashtagHtml = (text, isFilteredTag) => {
    let link = 'https://search.twitter.com/search?q=';
    let tags = [...text.matchAll(/[#]+[A-Za-z0-9-_]+/g)];
    let hashlinks = tags.map((ht, i) => { 
      return <div 
          className={`hashtag ${isFilteredTag ? 'filtered-tag' : ''}`}
          key={ht[0]}
          onClick={async e => await dispatch(allActions.filterHashtags(e.target.innerText, currentFilteredTags))}
        >
        {' '}{ht[0]}
        </div> 
      })
    return hashlinks;
  };

  const createHashtagList = (tweets) => {
    let allHashtags = [];
    allHashtags = [ ...allHashtags, ...tweets.map(tweet => tweet.hashTags)];
    const hashTagSet = new Set(currentFilteredTags);
    return _.chain(allHashtags)
      .flatten()
      .map(item => item[0])
      .uniq()
      .map(tag => getHashtagHtml(tag, hashTagSet.has(tag[0]))[0])
      .value();
  }

  return (
    <div className="hashtags-container">
        <div className='title'>Filter by hashtag</div>
        <div className="hashtags">
          {
            createHashtagList(posts) 
          }
        </div>
    </div>
  );
}

export default HashtagContainer;
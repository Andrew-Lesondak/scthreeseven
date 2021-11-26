import '../style/HashtagContainer.scss';
import {useSelector, useDispatch} from 'react-redux';

function HashtagContainer() {

  const posts = useSelector(state => state.posts);

  const getHashtags = () => {
    let hashTags = [];
    hashTags = [ ...hashTags, ...posts.map((tweet, i) => tweet.hashTags)];
    return hashTags;
  };

  return (
    <div className="hashtags-container">
        <div className='title'>Filter by hashtag</div>
        <div className="hashtags">
        {
          getHashtags()
        }
        </div>
    </div>
  );
}

export default HashtagContainer;
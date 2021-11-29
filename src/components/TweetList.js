import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import '../style/TweetList.scss';
import LoadMore from './LoadMore';

const TweetList = () => {

    const posts = useSelector(state => state.tweetData.posts);
    const currentFilteredTags = useSelector(state => state.filteredHashTags);
    const debouncedTerm = useSelector(state => state.term);
    const dispatch = useDispatch();

    const getHashtagHtml = (text, isFilteredTag) => {
        
        let tags = [...text.matchAll(/[#]+[A-Za-z0-9-_]+/g)];
        let hashlinks = tags.map((ht, i) => { 
            return (
                <div 
                    className={`hashtag ${isFilteredTag ? 'filtered-tag' : ''}`}
                    key={ht[0]}
                    onClick={async e => await dispatch(allActions.filterHashtags(e.target.innerText, currentFilteredTags))}
                >
                    {' '}{ht[0]}
                </div>
            )
        });
        return hashlinks;
    };

    const showTweetList = (debouncedTerm) => {

        if(debouncedTerm) {
            return posts && posts.map(item => { 
                const hashTagSet = new Set(currentFilteredTags);
                let isFilteredIn = false;

                for(const tag of item.hashTags) {
                    if(hashTagSet.has(tag[0])) {
                        isFilteredIn = true;
                        break;
                    }
                }

                if(hashTagSet.size === 0 || isFilteredIn) {
                    return (
                        <div className="row" key={`${item.screenName}${item.tweetId}`}>
                            <div className="col">
                                <div className="user-image" style={{backgroundImage: `url(${item.imageUrl})`}}></div>
                            </div>
                            <div className="col">
                                <div className="screen-name">@{item.screenName}</div>
                                <div>
                                    {item.fullText}
                                    {item.urls.map((url, i) => <span key={i}>{' '}<a target="_blank" rel="noreferrer" href={url}>{url}</a></span>)}
                                </div>
                                <div className="hashtags">
                                    {item.hashTags.map(tag => getHashtagHtml(tag[0], hashTagSet.has(tag[0])))}
                                </div>
                            </div>
                        </div>
                    );
                }
                return (null)
            });
        }
    };

    return (
        <div className="tweet-content">
            <div className="tweet-list">
                {showTweetList(debouncedTerm)}
                <LoadMore />
            </div>
        </div>
    );
}

export default TweetList;
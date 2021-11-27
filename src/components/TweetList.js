import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import '../style/TweetList.scss';
import { parseHashtag } from '../utils'
import LoadMore from './LoadMore';

const TweetList = () => {

  const posts = useSelector(state => state.posts);
  const currentFilteredTags = useSelector(state => state.filteredHashTags);
  const debouncedTerm = useSelector(state => state.term);
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

  const showTweetList = (debouncedTerm) => {
      console.log('tweet list: ', debouncedTerm)
      if(debouncedTerm) {
        return posts.map(item => { 
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
                            <div style={{backgroundImage: `url(${item.imageUrl})`, height: "50px", width: "50px", borderRadius: "50%"}}></div>
                        </div>
                        <div className="col">
                            <div>@{item.screenName}</div>
                            <div>
                                {item.fullText}
                                {item.urls.map((url, i) => <span key={i}>{' '}<a target="_blank" rel="noreferrer" href={url}>{url}</a></span>)}
                            </div>
                            <div className="hashtags">
                                {
                                    item.hashTags.map(tag => getHashtagHtml(tag[0], hashTagSet.has(tag[0])))
                                }
                            </div>
                        </div>
                    </div>
                )

            } else {
                return <div></div>
            }
        })
      } else {
          return <div></div>
      }
  };

    return (
        <div className="tweet-content">
            <div className="tweet-list">
                {
                    showTweetList(debouncedTerm)
                }
            </div>
            <LoadMore />
        </div>
    )
}

export default TweetList;
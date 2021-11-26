import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import '../style/TweetList.scss';
import { parseHashtag } from '../utils'

const TweetList = () => {

  const posts = useSelector(state => state.posts);
    //   const [results, setResults] = useState([]);
  //const dispatch = useDispatch();
  
//   useEffect(async () => {
//     dispatch(await allActions.fetchPosts())
//   }, []);
console.log('tweets ', posts)

    return (
        <div className="tweet-list">
            {
                posts.map(item => { 
                    return (
                        <div className="row" key={item.tweetId}>
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
                                        item.hashTags
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TweetList;
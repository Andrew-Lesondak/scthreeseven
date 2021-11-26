import axios from 'axios';
import twitter from '../apis/twitter';
import { POSTS } from '../constants';
import { parseURL, parseUsername, parseHashtag, getHashtagHtml, getUniqueHashtags, removeHashtags, getHashtags, getUrls, stripText } from '../utils';

export const fetchPosts = async (term, currentPosts = [], loadMore = '') => {

    let tweets = [];
    
    if(term) {

        let response = '';
        
        if(currentPosts) {
            tweets = [...tweets, ...currentPosts];
        }

        try {
            response = await twitter.get(`/search/tweets.json?q=${term}${loadMore}`);
        } catch (error) {
            console.log(error);
        }

        if('data' in response && 'statuses' in response.data) {

            let currentPostsSet = new Set(currentPosts.map(post => post.tweetId));

            for(const [i, tweet] of response.data.statuses.entries()) {

                if(currentPostsSet.has(tweet.id)) continue;

                const tweetObj = {
                    tweetId: tweet.id,
                    imageUrl: tweet.user.profile_image_url,
                    screenName: tweet.user.screen_name,
                    fullText: stripText(tweet.full_text).trim(),
                    urls: getUrls(tweet.full_text),
                    hashTags: getHashtags(tweet.full_text),
                };

                tweets = [...tweets, tweetObj];
            }
        }
    }
    
    return { type: POSTS, payload: tweets };
}
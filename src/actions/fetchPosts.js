import axios from 'axios';
import twitter from '../apis/twitter';
import { POPULAR_POSTS, REQUEST_TWEETS_FAILED } from '../constants';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { parseURL, parseUsername, parseHashtag, getHashtags, removeHashtags, getUrls, stripText } from '../utils';

export const fetchPosts = async term => {

    let tweets = [];
    console.log('fetch posts: ', term);
    
    // only search if text input is not empty string
    // (async () => {
        if(term) {

            console.log('gonna try api call')
            
            let response = '';

            try {
                response = await twitter.get(`/search/tweets.json?q=${term}`);
            } catch (error) {
                console.log(error);
            }
            if('data' in response && 'statuses' in response.data) {
                for(const tweet of response.data.statuses) {
                    
                    const tweetObj = {
                        tweetId: tweet.id,
                        imageUrl: tweet.user.profile_image_url,
                        screenName: tweet.user.screen_name,
                        fullText: stripText(tweet.full_text).trim(),
                        urls: getUrls(tweet.full_text),
                        hashTags: getHashtags(tweet.full_text)
                    };

                    tweets = [...tweets, tweetObj];
                    console.log('got tweets', tweets)

                    // console.log('inner payload: ', tweets)
                    // return { type: POPULAR_POSTS, payload: tweets };
                }
            }
        }
    // })();
    
    console.log('payload: ', tweets)
    return { type: POPULAR_POSTS, payload: tweets };
}

// Wrap the async function and dispatch an error if an error occurred
function wrap(fn) {
  return function(dispatch) {
    fn(dispatch).catch(error => dispatch({ type: 'ERROR', error }));
  };
}
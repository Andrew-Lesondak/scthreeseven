import axios from 'axios';
import twitter from '../apis/twitter';
import { POPULAR_POSTS, REQUEST_TWEETS_FAILED } from '../constants';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { parseURL, parseUsername, parseHashtag, getHashtags, removeHashtags, getUrls, stripText } from '../utils';

export const fetchPosts = async () => {

    let response = '';

    try {
        response = await twitter.get('/search/tweets.json?');
    } catch (error) {
        console.log(error)
    }
console.log(response.data.statuses)
    let tweets = [];

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
    }

    return { type: POPULAR_POSTS, payload: tweets }
}

// Wrap the async function and dispatch an error if an error occurred
function wrap(fn) {
  return function(dispatch) {
    fn(dispatch).catch(error => dispatch({ type: 'ERROR', error }));
  };
}
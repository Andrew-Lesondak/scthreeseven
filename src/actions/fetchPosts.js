import twitter from '../apis/twitter';
import { POSTS } from '../constants';
import { getHashtags, getUrls, stripText } from '../utils';

export const fetchPosts = async (term, currentPosts = [], loadMoreQuery = '') => {

    let tweets = [...currentPosts];
    let loadMoreText;
    let cleanedTerm = term.replace(/[^\w\s]/gi, '').trim();
    
    if(cleanedTerm) {
        let response = '';

        try {
            response = await twitter.get(`/search/tweets.json?q=${cleanedTerm}${loadMoreQuery}`);
        } catch (error) {
            console.log(error);
        }

        if('data' in response && 'statuses' in response.data) {

            let currentPostsSet = new Set(currentPosts.map(post => post.tweetId));
            loadMoreText = !(response.data.statuses.length) ||
                (response.data.statuses.length === 1 && tweets.filter(tweet => tweet.tweetId === response.data.statuses[0].id).length)  ? 
                'End of Tweets' : 
                'Load More';

            for(const tweet of response.data.statuses) {

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
    
    return { type: POSTS, payload: { posts: tweets, loadMoreText: loadMoreText }};
};
import axios from 'axios';
import BEARERKEY from '../constants/keys';

export default axios.create({
    baseURL: 'http://localhost:8080/https://api.twitter.com/1.1',
    headers: {
        'Authorization': `Bearer ${BEARERKEY}`,
    },
    params: {
        // q: "coding",
        tweet_mode: "extended",
        count: 5,
        result_type: "popular",
         //max_id
    },
})
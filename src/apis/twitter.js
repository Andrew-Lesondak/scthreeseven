import axios from 'axios';
import BEARERKEY from '../constants/keys';

export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1',
    headers: {
        'Authorization': `Bearer ${BEARERKEY}`,
        'origin': 'x-requested-with'
    }
})
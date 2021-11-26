import axios from 'axios';
import { FILTERED_HASH_TAGS } from '../constants';
import { parseURL, parseUsername, parseHashtag, getHashtags, removeHashtags, getUrls, stripText } from '../utils';

export const filterHashtags = (tag, currentFilteredTags) => {

    const tagsSet = new Set(currentFilteredTags);
    let filteredTags = [];
    console.log('current filtered: ', currentFilteredTags)

    if(tagsSet.has(tag)) {
        tagsSet.delete(tag);
        for(const tag of tagsSet) {
            filteredTags = [...filteredTags, tag];
        }
    } else {
        filteredTags = [...currentFilteredTags, tag];
    }
    

    console.log('filtered: ', filteredTags)
    
    return { type: FILTERED_HASH_TAGS, payload: filteredTags };
    
}
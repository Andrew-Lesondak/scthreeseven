import axios from 'axios';
import { FILTERED_HASH_TAGS, CLEAR_FILTERED } from '../constants';
import { parseURL, parseUsername, parseHashtag, getHashtags, removeHashtags, getUrls, stripText } from '../utils';

export const filterHashtags = (tag, currentFilteredTags) => {

    let filteredTags = [];
    console.log('tag ', tag)
    console.log('filtered tags: ', currentFilteredTags)

    if(tag !== '') {

        console.log(' not empty')
        const tagsSet = new Set(currentFilteredTags);

        if(tagsSet.has(tag)) {
            tagsSet.delete(tag);
            for(const tag of tagsSet) {
                filteredTags = [...filteredTags, tag];
            }
        } else {
            filteredTags = [...currentFilteredTags, tag];
        }
        
        return { type: FILTERED_HASH_TAGS, payload: filteredTags };   

    } else {
        console.log('is empty')
        return { type: CLEAR_FILTERED, payload: filteredTags };   
    }
}
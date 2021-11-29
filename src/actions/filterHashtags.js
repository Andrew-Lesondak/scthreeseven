import { FILTERED_HASH_TAGS, CLEAR_FILTERED } from '../constants';

export const filterHashtags = (tag, currentFilteredTags) => {

    let filteredTags = [];

    if(tag !== '') {

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
        return { type: CLEAR_FILTERED, payload: filteredTags };   
    }
}
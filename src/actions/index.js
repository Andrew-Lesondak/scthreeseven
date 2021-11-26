import { fetchPosts } from './fetchPosts';
import { filterHashtags } from './filterHashtags';
import { setTerm } from './setTerm';
import { setDebouncedTerm } from './setDebouncedTerm';

const allActions = {
    fetchPosts,
    filterHashtags,
    setTerm,
    setDebouncedTerm
}

export default allActions
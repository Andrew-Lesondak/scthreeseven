import { DEBOUNCED_TERM } from '../constants';

export const setDebouncedTerm = term => {

    return { type: DEBOUNCED_TERM, payload: term };
}

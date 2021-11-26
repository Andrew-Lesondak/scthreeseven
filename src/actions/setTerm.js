import { TERM } from '../constants';

export const setTerm = term => {

    return { type: TERM, payload: term };
}

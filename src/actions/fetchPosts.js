import axios from 'axios';
import twitter from '../apis/twitter';
import { POPULAR_POSTS } from '../constants';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

export const fetchPosts = async dispatch => {

  let response = { data: '' };
//encodeURIComponent()
  twitter.get('/search/tweets.json?count=5&result_type=popular&q=%23nature')
  .then(response => {
    response = response;
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

  return { 
      type: POPULAR_POSTS, 
      payload: response.data 
  };

//   const currentUser = useSelector(state => state.currentUser)

//   const dispatch = useDispatch()

//   const user = {name: "Rei"}

//   useEffect(() => {
//     dispatch(allActions.userActions.setUser(user))
//   }, [])






    // const [videos, setVideos] = useState([]);

    // useEffect(() => {
    //     search(defaultSearchTerm);
    // }, [defaultSearchTerm]);

    // const search = async (term) => {
    //     const response = await youtube.get("/search", {
    //         params: {
    //             q: term,
    //         },
    //     });

    //     setVideos(response.data.items);

    // };

    // return [videos, search];

}

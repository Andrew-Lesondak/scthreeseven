import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import '../style/TweetList.scss';
import { parseHashtag } from '../utils'

const TweetList = () => {

  const posts = useSelector(state => state.posts);
    //   const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(async () => {
    dispatch(await allActions.fetchPosts())
  }, [])

    return (
        <div className="tweet-list">
            {
                posts.map(item => { 
                    return (
                        <div className="row" key={item.tweetId}>
                            <div className="col">
                                <div style={{backgroundImage: `url(${item.imageUrl})`, height: "50px", width: "50px", borderRadius: "50%"}}></div>
                            </div>
                            <div className="col">
                                <div>@{item.screenName}</div>
                                <div>
                                    {item.fullText}
                                    {item.urls.map((url, i) => <span key={i}>{' '}<a target="_blank" href={url}>{url}</a></span>)}
                                </div>
                                <div className="hashtags">
                                    {
                                        item.hashTags
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TweetList;




// const App = () => {
//   const counter = useSelector(state => state.counter)
//   const currentUser = useSelector(state => state.currentUser)

//   const dispatch = useDispatch()

//   const user = {name: "Rei"}

//   useEffect(() => {
//     dispatch(allActions.userActions.setUser(user))
//   }, [])

//   return (
//     <div className="App">
//       {
//         currentUser.loggedIn ? 
//         <>
//           <h1>Hello, {currentUser.user.name}</h1>
//           <button onClick={() => dispatch(allActions.userActions.logOut())}>Logout</button>
//         </> 
//         : 
//         <>
//           <h1>Login</h1>
//           <button onClick={() => dispatch(allActions.userActions.setUser(user))}>Login as Rei</button>
//         </>
//         }
//       <h1>Counter: {counter}</h1>
//       <button onClick={() => dispatch(allActions.counterActions.increment())}>Increase Counter</button>
//       <button onClick={() => dispatch(allActions.counterActions.decrement())}>Decrease Counter</button>
//     </div>
//   );
// }

// export default App;
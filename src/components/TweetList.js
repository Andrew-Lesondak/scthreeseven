import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../actions'
import '../style/TweetList.scss';

const TweetList = () => {

  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(await allActions.fetchPosts())
  }, [posts])

  return (
    <div className="tweet-list">
        {posts}
    </div>
  );
};

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
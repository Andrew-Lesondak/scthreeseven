import '../style/Search.scss';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';

function Search() {

    // const [term, setTerm] = useState('');
    // const [debouncedTerm, setDebouncedTerm] = useState(term);
    // const [results, setResults] = useState([]);
    const term = useSelector(state => state.term);
    const debouncedTerm = useSelector(state => state.term);
    const dispatch = useDispatch();

    // originally for a hooks warning from using a default search term,
    // using two useEffects() prevents a search being made if search term doesn't change from the last one made

    // runs every time 'term' changes
    // any time useEffect changes, we queue up the term to debouncedTerm which executes in 500 ms
    // if term changes within 500 ms we clear the timeout and start again
    useEffect(() => {
        const timerId = setTimeout(() => {
            // (async () => {
            //   console.log('use effect 1 setDebouncedTerm(term)', term)
            //   dispatch(allActions.setDebouncedTerm(term));
            // })()
              console.log('use effect 1 setDebouncedTerm(term)', term)
              dispatch(allActions.setDebouncedTerm(term));
        }, 500);
        
        // using this anon function for 'cleanup'
        // pretty sure react is using closure here to keep track of the function to be called at another time
        // on search input change, react calls this function first (from the last time around) 
        // then the func provided to useEffect called
        return () => {
            clearTimeout(timerId);
        };
    }, [term]);
    
    // 'lifecycle method'
    // need to tell useEffect when to render, so we provide it a second argument
    // 1. empty array []
    // 2. array with 1 or more things inside it, like term [term]
    // 3. no array at all
    // Also - cannot use async or await keywords in useEffect
        // can use regular promises
        // or create a func inside it and call it
        // or same as above but IIFE
    useEffect(() => {
        // (async () => {
        //     // only search if text input is not empty string
        //     if(debouncedTerm) {
        //         const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
        //             params: {
        //                 action: 'query',
        //                 list: 'search',
        //                 origin: '*',
        //                 format: 'json',
        //                 srsearch: debouncedTerm
        //             }
        //         });
        //         setResults(data.query.search);
        //     } else {
        //         setResults([]);
        //     }
        // })()
        (async () => {
          if(debouncedTerm) {
            console.log('use effect 2 fetchPosts(debouncedTerm)', debouncedTerm)
            dispatch(await allActions.fetchPosts(debouncedTerm));
          }
        })();

        //dispatch(allActions.fetchPosts(debouncedTerm));

    }, [debouncedTerm]);

  return (
    <div>
      <span className="search-bar">
        <input
            placeholder="Search by keyword"
            className="search-input"
            type="text"
            value={term}
            onChange={e => dispatch(allActions.setTerm(e.target.value))}
            />
      </span>
    </div>
  );

    // const renderedResults = results.map((result) => {
    //     return (
    //         <div className="item" key={result.pageid}>
    //             <div className="content">
    //                 <div className="header">
    //                 <a 
    //                     className=""
    //                     href={`https://en.wikipedia.org?curid=${result.pageid}`}
    //                     target="_blank"
    //                     rel="noreferrer">
    //                     {result.title}
    //                 </a>
    //                 </div>
    //                 {/* below poses risk to possible XSS attacks, make sure you trust the source of data.
    //                 not a good practice to allow html to render on the page from 3rd party source */}
    //                 <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
    //             </div>
    //         </div>
    //     )
    // })

    // return (
    //     <div>
    //         <div className="ui form">
    //             <div className="field">
    //                 <label>Enter Search Term</label>
    //                 <input 
    //                     className="input"
    //                     value={term}
    //                     onChange={e => setTerm(e.target.value)}
    //                  />
    //             </div>
    //         </div>
    //         <div className="ui celled list">
    //             {renderedResults}
    //         </div>
    //     </div>
    // );
}

export default Search;

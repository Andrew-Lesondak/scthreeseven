
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';

const getUrls = (text) => {
  return [...text.matchAll(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g)];
};

const stripText = (text) => {
  return removeHashtags(removeUrls(text));
};

const removeUrls = (text) => {
  return text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, '').trim();
};

const removeHashtags = (text) => {
  return text.replace(/[#]+[A-Za-z0-9-_]+/g, '').trim();
};

// Extract hashtags from string as html
const getHashtagHtml = (text, tweets = []) => {

  let tags = [...text.matchAll(/[#]+[A-Za-z0-9-_]+/g)];
  let hashlinks = tags.map((ht, i) => { 
    return <div 
        className="hashtag" 
        key={ht[0]}
        onClick={e => allActions.filterHashtags(useSelector, useDispatch, e.target.value)}
      >
      {' '}{ht[0]}
      </div> 
    })
  return hashlinks;
};

const getHashtags = (text) => {
  let tags = [...text.matchAll(/[#]+[A-Za-z0-9-_]+/g)];
  return tags;
};

export { getHashtagHtml, getHashtags, removeHashtags, getUrls, stripText }; 
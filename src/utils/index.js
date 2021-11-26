
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import _ from 'lodash';
/*
* Credit - https://www.benmarshall.me/parse-twitter-hashtags/
*/

// Auto-link URLs in a string
// Usage: mystring.parseURL()
const parseURL = (text) => {
  return text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function( url ) {
    return url.link( url );
  });
};

// Auto-link Twitter usernames in a string
// Usage: mystring.parseUsername()
const parseUsername = (text) => {
  return text.replace(/[@]+[A-Za-z0-9-_]+/g, function( u ) {
    var username = u.replace("@","");
    return u.link( 'http://twitter.com/' + username );
  });
};

// Auto-link Twitter hashtags in a string
// Usage: mystring.parseHashtag()
const parseHashtag = (text) => {
  return text.replace(/[#]+[A-Za-z0-9-_]+/g, function( t ) {
    var tag = t.replace("#","%23");
    return t.link( 'https://search.twitter.com/search?q=' + tag );
  });
};

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
  let link = 'https://search.twitter.com/search?q=';
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

// Extract hashtags from string
const getUniqueHashtags = (text) => {
  let hashTags = [];
  let link = 'https://search.twitter.com/search?q=';
  let tags = [...text.matchAll(/[#]+[A-Za-z0-9-_]+/g)];

  // optional lodash 
  hashTags = _.chain(tags)
    .uniq()
    .value()

  let hashlinks = hashTags.map((ht, i) => <span className="hashtag" key={i}>{' '}<a target="_blank" href={link+ht}>{ht[0]}</a></span>)
  return hashlinks;
};

export { parseURL, parseUsername, parseHashtag, getHashtagHtml, getUniqueHashtags, getHashtags, removeHashtags, getUrls, stripText }; 
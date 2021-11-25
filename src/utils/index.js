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
    return t.link( 'http://search.twitter.com/search?q=' + tag );
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

// Extract hashtags from string
const getHashtags = (text) => {
  return [...text.matchAll(/[#]+[A-Za-z0-9-_]+/g)];
};

export { parseURL, parseUsername, parseHashtag, getHashtags, removeHashtags, getUrls, stripText }; 
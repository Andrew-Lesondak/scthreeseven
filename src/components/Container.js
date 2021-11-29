import '../style/Container.scss';
import Title from './Title';
import Search from './Search';
import TweetList from './TweetList';
import HashtagContainer from './HashtagContainer';

function Container() {
  return (
    <div className="container">
      <div className="main-content">
        <Title />
        <Search />
        <TweetList />
        <HashtagContainer />
      </div>
    </div>
  );
}

export default Container;

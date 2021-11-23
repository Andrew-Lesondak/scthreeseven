import '../style/Container.scss';
import Title from './Title';
import Search from './Search';
import TweetList from './TweetList';
import HashtagContainer from './HashtagContainer';

function Container() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
            <Title />
        </div>
      </div>
      <div className="row">
        <div className="col col-1">
          <Search />
          <TweetList />
        </div>
        <div className="col col-2">
          <HashtagContainer />
        </div>
      </div>
    </div>
  );
}

export default Container;

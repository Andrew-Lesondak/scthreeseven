import '../style/HashtagContainer.scss';

function HashtagContainer() {
  return (
    <div className="hashtags-container">
        <div className='title'>Filter by hashtag</div>
        <div className="hashtags">
            <div className="hashtag">#Coding</div>
            <div className="hashtag">#Python</div>
            <div className="hashtag">#ComputerScience</div>
        </div>
    </div>
  );
}

export default HashtagContainer;
import '../style/Search.scss';

function Search() {
  return (
    <div>
      <span className="search-bar">
        <input 
            placeholder="Search by keyword"
            className="search-input"
            type="tex"/>
      </span>
    </div>
  );
}

export default Search;

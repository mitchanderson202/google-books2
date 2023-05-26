import "./Search.scss";

import { SearchContext } from "../../App";
import { useState, useContext, FormEvent, ChangeEvent, useRef } from "react";

const Search = () => {
  const { handleSearch } = useContext(SearchContext);
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const searchHistoryRef = useRef<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    searchHistoryRef.current.unshift(query);
    if (searchHistoryRef.current.length > 6) {
      searchHistoryRef.current.pop();
    }

    handleSearch(query);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchFocus = () => {
    setSearchActive(true);
  };

  const handleSearchBlur = () => {
    setSearchActive(false);
  };

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          required
        />

        <button type="submit">Search</button>

        {searchActive && (
          <ul className="Search-History">
            {searchHistoryRef.current.map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default Search;

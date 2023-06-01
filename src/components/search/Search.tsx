import "./Search.scss";

import { SearchContext } from "../../App";
import { useState, useContext, FormEvent, ChangeEvent, useEffect } from "react";

const Search = () => {
  const { handleSearch } = useContext(SearchContext);
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const updateSearchHistory = (updatedHistory: string[]) => {
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedHistory = [query, ...searchHistory.slice(0, 5)];
    updateSearchHistory(updatedHistory);

    handleSearch(query);
    setQuery("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchFocus = () => {
    setSearchActive(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchActive(false);
    }, 100);
  };

  const handleLiClick = (search: string) => {
    setQuery(search);
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
            {searchHistory.map((search, index) => (
              <li key={index} onClick={() => handleLiClick(search)}>
                {search}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default Search;

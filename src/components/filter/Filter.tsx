import "./Filter.scss";
import { SearchContext } from "../../App";
import { useState, useContext, ChangeEvent } from "react";
import { Book } from "../../App";

const Filter = () => {
  const { data, setData } = useContext(SearchContext);

  const [filter, setFilter] = useState("Select an option");

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);

    const sortKey = e.target.value;
    let sortedData: Book[] = [];

    if (sortKey === "Author A-Z") {
      sortedData = [...data].sort((a, b) =>
        (a.volumeInfo.authors?.[0] ?? "").localeCompare(
          b.volumeInfo.authors?.[0] ?? ""
        )
      );
    } else if (sortKey === "Author Z-A") {
      sortedData = [...data].sort((a, b) =>
        (b.volumeInfo.authors?.[0] ?? "").localeCompare(
          a.volumeInfo.authors?.[0] ?? ""
        )
      );
    } else if (sortKey === "Title A-Z") {
      sortedData = [...data].sort((a, b) =>
        a.volumeInfo.title.localeCompare(b.volumeInfo.title)
      );
    } else if (sortKey === "Title Z-A") {
      sortedData = [...data].sort((a, b) =>
        b.volumeInfo.title.localeCompare(a.volumeInfo.title)
      );
    } else if (sortKey === "Release Date (earliest to latest)") {
      sortedData = [...data].sort((a, b) =>
        a.volumeInfo.publishedDate.localeCompare(b.volumeInfo.publishedDate)
      );
    } else if (sortKey === "Release Date (latest to earliest)") {
      sortedData = [...data].sort((a, b) =>
        b.volumeInfo.publishedDate.localeCompare(a.volumeInfo.publishedDate)
      );
    }

    setData(sortedData);
  };

  return (
    <div className="Filter">
      <label htmlFor="filter">Filter By:</label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option>Select an option</option>
        <option>Author A-Z</option>
        <option>Author Z-A</option>
        <option>Title A-Z</option>
        <option>Title Z-A</option>
        <option>Release Date (earliest to latest)</option>
        <option>Release Date (latest to earliest)</option>
      </select>
    </div>
  );
};

export default Filter;

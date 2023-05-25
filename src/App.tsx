import "./App.scss";
import { useState, createContext, Dispatch, SetStateAction } from "react";

import Header from "./components/header/Header";
import Search from "./components/search/Search";
import Books from "./components/books/Books";
import Filter from "./components/filter/Filter";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate: string;
    imageLinks?: {
      thumbnail: string;
    };
    description?: string;
    previewLink: string;
  };
}

interface SearchContextProps {
  data: Book[];
  setData: Dispatch<SetStateAction<Book[]>>;
  handleSearch: (query: string) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  data: [],
  setData: () => {},
  handleSearch: () => {},
});

function App() {
  const [data, setData] = useState<Book[]>([]);
  const [showBooks, setShowBooks] = useState(false);

  const handleSearch = async (query: string) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`
    );
    const data = await response.json();
    setData(data.items || []);
    setShowBooks(true);
  };

  return (
    <div className="App">
      <Header />
      <SearchContext.Provider value={{ data, setData, handleSearch }}>
        <Search />
        <Filter />
      </SearchContext.Provider>
      {showBooks && <Books data={data} />}
    </div>
  );
}

export default App;

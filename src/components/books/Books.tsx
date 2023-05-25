import Card from "../card/Card";
import "./Books.scss";
import { Book } from "../../App";

type BooksProps = {
  data: Book[];
};

const Books = ({ data }: BooksProps) => {
  if (!data.length) {
    return <div>No books found, please search again</div>;
  }
  return (
    <div className="Books">
      {data.map((book: any) => (
        <Card key={book.id} book={book} />
      ))}
    </div>
  );
};

export default Books;

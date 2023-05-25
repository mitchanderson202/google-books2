import "./Card.scss";
import Modal from "../modal/Modal";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Book } from "../../App";

interface cardProps {
  book: Book;
}

const Card = ({ book }: cardProps) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal((prevState) => !prevState);
  };

  const modalContainer = document.getElementById("modal-root");

  return (
    <div className="Card" onClick={openModal}>
      <h2>{book.volumeInfo.title}</h2>
      <img
        src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title + "book image"}
      />
      <h6>
        Release Date:{" "}
        {new Date(book.volumeInfo.publishedDate).toLocaleDateString("en-au", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </h6>

      <h4>
        By {book.volumeInfo.authors && book.volumeInfo.authors.join(", ")}
      </h4>

      <p>
        {book.volumeInfo.description &&
          book.volumeInfo.description.slice(0, 200) + "..."}
      </p>
      <br />
      <p>
        <strong>Click to see more</strong>
      </p>
      {modalContainer &&
        createPortal(
          <Modal book={book} closeModal={closeModal} modal={modal} />,
          modalContainer
        )}
    </div>
  );
};

export default Card;

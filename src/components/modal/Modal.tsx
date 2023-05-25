import "./Modal.scss";
import { Book } from "../../App";

interface ModalProps {
  book: Book;
  modal: boolean;
  closeModal: () => void;
}

const Modal = ({ book, closeModal, modal }: ModalProps) => {
  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      {modal && (
        <div className="Modal-Overlay">
          <div className="Modal">
            <button
              className="Close-Button"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              X
            </button>
            <h2>{book.volumeInfo.title}</h2>
            <img
              src={
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.thumbnail
              }
              alt={book.volumeInfo.title + "book image"}
            />
            <p>{book.volumeInfo.description && book.volumeInfo.description}</p>
            <br />
            <a href={book.volumeInfo.previewLink} target="blank" rel="noopener">
              CLICK HERE TO SEE ON GOOGLE STORE!!!
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

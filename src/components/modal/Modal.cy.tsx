import Modal from "./Modal";

describe("<Modal />", () => {
  let book;
  let closeModal: () => void;
  let modal;

  beforeEach(() => {
    book = {
      id: "dummy-id",
      volumeInfo: {
        title: "Book Title",
        authors: ["Author 1", "Author 2"],
        publishedDate: "2023-01-01",
        imageLinks: {
          thumbnail: "https://example.com/book-thumbnail.jpg",
        },
        description: "Book description",
        previewLink: "https://example.com/book-preview",
      },
    };
    closeModal = cy.stub();
    modal = true;

    cy.mount(<Modal book={book} closeModal={closeModal} modal={modal} />);
  });

  it("renders", () => {
    cy.get(".Modal-Overlay").should("exist");
    cy.get(".Modal").should("exist");
  });

  it("renders title", () => {
    cy.get(".Modal h2").should("have.text", "Book Title");
  });

  it("renders description", () => {
    cy.get(".Modal p").should("have.text", "Book description");
  });

  it("renders link", () => {
    cy.get(".Modal a")
      .should("have.attr", "href", "https://example.com/book-preview")
      .should("have.attr", "target", "blank")
      .should("have.attr", "rel", "noopener")
      .should("have.text", "CLICK HERE TO SEE ON GOOGLE STORE!!!");
  });

  it("closes modal", () => {
    cy.get(".Close-Button").click();
    cy.wrap(closeModal).should("be.calledOnce");
  });
});

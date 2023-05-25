import Card from "./Card";

describe("<Card />", () => {
  let book;

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
    cy.mount(<Card book={book} />);
  });

  it("renders", () => {
    cy.get(".Card h2").should("have.text", "Book Title");
    cy.get("img").should(
      "have.attr",
      "src",
      "https://example.com/book-thumbnail.jpg"
    );
    cy.get("h6").should("have.text", "Release Date: Sunday, 1 Jan 2023");
    cy.get("h4").should("have.text", "By Author 1, Author 2");
    cy.get("p").should("have.text", "Book description...Click to see more");
  });
});

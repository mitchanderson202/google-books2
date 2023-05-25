import Books from "./Books";
import { Book } from "../../App";

describe("<Books />", () => {
  it("doesn't render when no data received", () => {
    const data: Book[] = [];
    cy.mount(<Books data={data} />);
    cy.contains("No books found, please search again").should("exist");
    cy.get(".Books").should("not.exist");
  });

  it("renders when data is received", () => {
    const data: Book[] = [
      {
        id: "book1",
        volumeInfo: {
          title: "Book 1",
          authors: ["Author 1"],
          publishedDate: "2023-01-01",
          imageLinks: {
            thumbnail: "https://example.com/book1-thumbnail.jpg",
          },
          description: "Book 1 description",
          previewLink: "https://example.com/book1-preview",
        },
      },
      {
        id: "book2",
        volumeInfo: {
          title: "Book 2",
          authors: ["Author 2"],
          publishedDate: "2023-02-01",
          imageLinks: {
            thumbnail: "https://example.com/book2-thumbnail.jpg",
          },
          description: "Book 2 description",
          previewLink: "https://example.com/book2-preview",
        },
      },
    ];
    cy.mount(<Books data={data} />);
    cy.get(".Books").should("exist");
  });
});

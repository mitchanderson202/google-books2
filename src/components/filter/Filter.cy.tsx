import Filter from "./Filter";

describe("<Filter />", () => {
  // const mockData = [
  //   {
  //     id: "1",
  //     volumeInfo: {
  //       title: "Book 1",
  //       authors: ["Author 1"],
  //       publishedDate: "2022-01-01",
  //     },
  //   },
  //   {
  //     id: "2",
  //     volumeInfo: {
  //       title: "Book 2",
  //       authors: ["Author 2"],
  //       publishedDate: "2021-12-01",
  //     },
  //   },
  //   {
  //     id: "3",
  //     volumeInfo: {
  //       title: "Book 3",
  //       authors: ["Author 3"],
  //       publishedDate: "2021-11-01",
  //     },
  //   },
  // ];
  beforeEach(() => {
    cy.mount(<Filter />);
  });

  it("renders", () => {
    cy.get(".Filter").should("exist");
  });

  it("should render filter options", () => {
    cy.get("#filter").should("have.length", 1);
    cy.get("#filter option").should("have.length", 7);
  });

  //Need to learn more about testing mock data. Return to.
});

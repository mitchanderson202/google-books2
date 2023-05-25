import App from "./App";

describe("<App />", () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  it("renders", () => {
    cy.get(".App").should("exist");
  });

  it("searches for books", () => {
    cy.get("input").type("Lord of the rings");
    cy.get("button").click();
    cy.get(".Books").should("exist");
  });
});

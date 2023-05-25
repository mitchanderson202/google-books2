import Search from "./Search";

describe("<Search />", () => {
  let searchInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let searchButton: Cypress.Chainable<JQuery<HTMLElement>>;
  beforeEach(() => {
    cy.mount(<Search />);
    searchInput = cy.get('.Search input[type="text"]');
    searchButton = cy.get('.Search button[type="submit"]');
  });
  it("renders", () => {
    searchInput.should("exist");
    searchButton.should("exist");
  });

  it("update query", () => {
    searchInput.type("Lord of the rings");
    searchInput.should("have.value", "Lord of the rings");
  });

  it("should perform a search when the form is submitted", () => {
    searchInput.type("Lord of the rings");
    searchButton.click();
    searchInput.type("Harry Potter");
    searchButton.click();
    searchInput.type("To kill a Mockingbird");
    searchButton.click();
  });

  it("should display search history on input focus", () => {
    searchInput.focus();
    cy.get(".Search-History").should("exist");
  });

  it("should hide search history on input blur", () => {
    searchInput.focus();
    cy.get(".Search-History").should("exist");

    searchInput.blur();
    cy.get(".Search-History").should("not.exist");
  });
});

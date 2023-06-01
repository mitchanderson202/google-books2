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

  it("stores search history in localStorage", () => {
    localStorage.clear();

    searchInput.type("Lord of the rings");
    searchButton.click();
    searchInput.type("Harry Potter");
    searchButton.click();

    cy.window().then((win) => {
      const storedHistory = JSON.parse(
        win.localStorage.getItem("searchHistory") || "[]"
      ) as string[];

      expect(storedHistory).to.have.length(2);
      expect(storedHistory[0]).to.equal("Harry Potter");
      expect(storedHistory[1]).to.equal("Lord of the rings");
    });
  });

  it("displays search history and can be clicked to add to input", () => {
    searchInput.type("Lord of the rings");
    searchButton.click();
    searchInput.type("Harry Potter");
    searchButton.click();
    searchInput.type("To kill a Mockingbird");
    searchButton.click();

    searchInput.focus();
    cy.get(".Search-History > :nth-child(1)").click();
    cy.get("input").should(($input) => {
      expect($input.val()).to.equal("To kill a Mockingbird");
    });

    searchInput.focus();
    cy.get(".Search-History > :nth-child(2)").click({ force: true });
    cy.get("input").should(($input) => {
      expect($input.val()).to.equal("Harry Potter");
    });
    //need to fix this, not showing apparently, but works fine on the test screen and broswer?

    searchInput.focus();
    cy.get(".Search-History > :nth-child(3)").click({ force: true });
    cy.get("input").should(($input) => {
      expect($input.val()).to.equal("Lord of the rings");
    });
    //need to fix this, not showing apparently, but works fine on the test screen and broswer?
  });

  it("limits search history to maximum items", () => {
    localStorage.clear();

    searchInput.type("Query 1");
    searchButton.click();
    searchInput.type("Query 2");
    searchButton.click();
    searchInput.type("Query 3");
    searchButton.click();
    searchInput.type("Query 4");
    searchButton.click();
    searchInput.type("Query 5");
    searchButton.click();
    searchInput.type("Query 6");
    searchButton.click();
    searchInput.type("Query 7");
    searchButton.click();

    cy.window().then((win) => {
      const storedHistory = JSON.parse(
        win.localStorage.getItem("searchHistory") || "[]"
      ) as string[];

      expect(storedHistory).to.have.length(6);
      expect(storedHistory).to.deep.equal([
        "Query 7",
        "Query 6",
        "Query 5",
        "Query 4",
        "Query 3",
        "Query 2",
      ]);
    });
  });
});

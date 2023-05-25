import Header from "./Header";

describe("<Header />", () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it("renders", () => {
    cy.get(".Header").should("exist");
  });

  it("renders links", () => {
    cy.get(
      ".Header-Information a[href='https://www.linkedin.com/in/mitchandersondeveloper/']"
    )
      .should("have.text", "LinkedIn")
      .should("have.attr", "target", "blank")
      .should("have.attr", "rel", "noopener");
    cy.get(".Header-Information a[href='https://github.com/mitchanderson202']")
      .should("have.text", "Github")
      .should("have.attr", "target", "blank")
      .should("have.attr", "rel", "noopener");
    cy.get(".Header-Information a[href='https://mitchandersondeveloper.com/']")
      .should("have.text", "Website")
      .should("have.attr", "target", "blank")
      .should("have.attr", "rel", "noopener");
  });
});

import { mount } from "cypress/react";
import List from "pages/List/List";
import { createBrowserHistory } from "history";
import { AppProvider } from "contexts/Context";

it("should add to favorites menu", () => {
  const history = createBrowserHistory();
  history.push("/list");
  cy.render(
    <AppProvider>
      <List />
    </AppProvider>,
    "/list"
  );

  cy.get('[data-cy="heart"]').first().click();
  cy.get('[data-cy="navbar-heart"]').first().click();
  cy.get("ul").contains("Doctor Strange in the Multiverse of Madness");
});

it("should validate cart empty", () => {
  const history = createBrowserHistory();
  history.push("/list");
  cy.render(
    <AppProvider>
      <List />
    </AppProvider>,
    "/list"
  );

  cy.get('[data-cy="navbar-cart"]').first().click();
  cy.findByText("Finalizar compra").click();
  cy.findByText("Nenhum item adicionado ao carrinho!");
});

it("should add to cart and redirect to checkout", () => {
  const history = createBrowserHistory();
  history.push("/list");
  cy.render(
    <AppProvider>
      <List />
    </AppProvider>,
    "/list"
  );

  cy.get('[data-cy="add"]').first().click();
  cy.get('[data-cy="navbar-cart"]').first().click();
  cy.get("ul").contains("Doctor Strange in the Multiverse of Madness");
  cy.findByText("Finalizar compra")
    .click()
    .then(() => {
      expect(window.location.pathname).to.equal("/checkout");
    });
});

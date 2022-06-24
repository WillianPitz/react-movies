import { AppProvider } from "contexts/Context";
import { createBrowserHistory } from "history";
import Checkout from "pages/Checkout/Checkout";

it("Checkout page", () => {
  const history = createBrowserHistory();
  history.push("/checkout");
  cy.render(
    <AppProvider>
      <Checkout />
    </AppProvider>,
    "/checkout"
  );

  cy.findByTestId("name").type("Nome teste");
  cy.findByTestId("cpf").type("00000000000");
  cy.findByTestId("phone").type("11111111111");
  cy.findByTestId("email").type("email@email.com");
  cy.findByTestId("cep").type("22222222");
  cy.findByTestId("address").type("Address Test");
  cy.findByTestId("city").type("City Test");
  cy.findByTestId("state").type("State Test");

  cy.findByTestId("button-test").click();
  cy.findByText("Obrigado Nome teste");
  cy.findByText("Sua compra foi finalizada com sucesso!");
  cy.findByText("Ir para loja")
    .click()
    .then(() => {
      expect(window.location.pathname).to.equal("/");
    });
});

import { mount } from "cypress/react";
import Button from "components/Button/Button";

it("should call onClick when user clicks on button", () => {
  const onClick = cy.spy();
  mount(<Button onClick={onClick}>button</Button>);

  cy.findByText("button")
    .click()
    .then(() => {
      expect(onClick).to.called;
    });
});

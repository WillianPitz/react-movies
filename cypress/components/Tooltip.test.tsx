import { mount } from "cypress/react";
import { Tooltip } from "components/Tooltip/Tooltip";

it("Tooltip component", () => {
  mount(<Tooltip tooltipMessage="test message">Tooltip</Tooltip>);

  cy.findByText("Tooltip").trigger("mouseover");
  cy.findByText("test message");
});

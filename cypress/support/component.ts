import "@testing-library/cypress/add-commands";
import { MountReturn } from "cypress/react";
import "./commands";
import { mount } from "cypress/react";
import "global.css";

declare global {
  namespace Cypress {
    interface Chainable {
      render(component: JSX.Element, route?: string): Chainable<MountReturn>;
      mount: typeof mount;
    }
  }
}

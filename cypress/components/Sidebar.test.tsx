import Sidebar from "components/Sidebar/Sidebar";
import { mount } from "cypress/react";

it("Sidebar component", () => {
  mount(
    <Sidebar
      isOpen={true}
      title=""
      onClickEmpty={() => {}}
      setIsOpen={() => {}}
    >
      SidebarComponent Test
    </Sidebar>
  );

  cy.findByText("SidebarComponent Test");
});

it("should call onClickEmpty", () => {
  const onClickEmpty = cy.spy();
  mount(
    <Sidebar
      isOpen={true}
      title=""
      onClickEmpty={onClickEmpty}
      setIsOpen={() => {}}
    >
      SidebarComponent Test
    </Sidebar>
  );

  cy.findByText("Esvaziar")
    .click()
    .then(() => {
      expect(onClickEmpty).to.called;
    });
});

it("should call setIsOpen", () => {
  const setIsOpen = cy.spy();
  mount(
    <Sidebar
      isOpen={true}
      title=""
      onClickEmpty={() => {}}
      setIsOpen={setIsOpen}
    >
      SidebarComponent Test
    </Sidebar>
  );

  cy.get('[data-cy="X"]')
    .click()
    .then(() => {
      expect(setIsOpen).to.called;
    });
});

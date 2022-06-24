import { mount } from "cypress/react";
import Modal from "components/Modal/Modal";

describe("Modal component", () => {
  it("should open modal with finish message", () => {
    mount(
      <Modal
        isOpen={true}
        closeModal={() => {}}
        onClickSubmitModal={() => {}}
      />
    );
    cy.findByText("Sua compra foi finalizada com sucesso!");
  });

  it("should open modal with error message", () => {
    mount(
      <Modal
        isOpen={true}
        closeModal={() => {}}
        onClickSubmitModal={() => {}}
        errorMessage={"Mensagem de erro"}
      />
    );
    cy.findByText("Mensagem de erro");
  });

  it("should call onClickSubmitModal", () => {
    const onClickSubmitModal = cy.spy();
    mount(
      <Modal
        isOpen={true}
        closeModal={() => {}}
        onClickSubmitModal={onClickSubmitModal}
      />
    );
    cy.findByText("Ir para loja")
      .click()
      .then(() => {
        expect(onClickSubmitModal).to.called;
      });
  });
});

import { mount } from "cypress/react";
import Input from "components/Input/Input";
import { Formik } from "formik";

describe("input component", () => {
  it("should call onSubmit passing values", () => {
    const onSubmit = cy.spy();
    mount(
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => onSubmit(values)}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Input name="name" />
            <button type="submit">submit</button>
          </form>
        )}
      </Formik>
    );

    cy.get("input").clear().type("input test");
    cy.get("button")
      .click()
      .then(() => {
        expect(onSubmit).to.calledWith({ name: "input test" });
      });
  });
});

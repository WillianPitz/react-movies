import Navbar from "components/Navbar/Navbar";
import { mount } from "cypress/react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Routes } from "react-router-dom";

it("Navbar component", () => {
  const history = createBrowserHistory();
  history.push("/");

  mount(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar
              onChange={() => {}}
              onClickCart={() => {}}
              onClickHeart={() => {}}
              itemsInCart={5}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );

  const input = cy.get("input").clear().type("input test");
  expect(input.should("have.value", "input test"));
});

it("should call onClickHeart", () => {
  const onClickHeart = cy.spy();

  const history = createBrowserHistory();
  history.push("/");

  mount(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar
              onChange={() => {}}
              onClickCart={() => {}}
              onClickHeart={onClickHeart}
              itemsInCart={5}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );

  cy.get("button")
    .first()
    .click()
    .then(() => {
      expect(onClickHeart).to.called;
    });
});

it("should call onClickCart", () => {
  const onClickCart = cy.spy();

  const history = createBrowserHistory();
  history.push("/");

  mount(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar
              onChange={() => {}}
              onClickCart={onClickCart}
              onClickHeart={() => {}}
              itemsInCart={5}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );

  cy.get("button")
    .last()
    .click()
    .then(() => {
      expect(onClickCart).to.called;
    });
});

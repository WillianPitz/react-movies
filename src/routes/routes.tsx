import { AppProvider } from "contexts/Context";
import Checkout from "pages/Checkout/Checkout";
import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import List from "../pages/List/List";

export default function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route
          path="/"
          element={
            <AppProvider>
              <List />
            </AppProvider>
          }
        />

        <Route
          path="/checkout"
          element={
            <AppProvider>
              <Checkout />
            </AppProvider>
          }
        />
      </Router>
    </BrowserRouter>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
/**
 * Renderiza o componente utilizando o tema da aplicação
 */
export const renderWithTheme = (component: JSX.Element, route = "/") => (
  <BrowserRouter>
    <Routes>
      <Route element={component} path={route} />
    </Routes>
  </BrowserRouter>
);

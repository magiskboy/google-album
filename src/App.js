import React, { useState, Suspense } from "react";
import { PageContext, AuthContext } from "./contexts";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Album = React.lazy(() => import("./pages/Album"));
const pages = new Map([
  ["home", Home],
  ["login", Login],
  ["album", Album],
]);

const DEFAULT_PAGE = "home";

function App() {
  const [page, setPage] = useState({ name: "home", params: {} });
  const [auth, setAuth] = useState();
  const pageContextValue = {
    setPage,
    page,
  };
  const authContextValue = {
    setAuth,
    auth,
  };
  const PageComponent = pages.has(page.name)
    ? pages.get(page.name)
    : pages.get(DEFAULT_PAGE);

  return (
    <PageContext.Provider value={pageContextValue}>
      <AuthContext.Provider value={authContextValue}>
        <Suspense fallback={<div>Loading...</div>}>
          <PageComponent />
        </Suspense>
      </AuthContext.Provider>
    </PageContext.Provider>
  );
}

export default App;

import React, { useState, Suspense } from "react";
import { PageContext, AuthContext, GOOGLE_AUTH_RESPONSE_KEY } from "./contexts";
import "./App.scss";

const Home = React.lazy(() => import("./pages/Home"));
const pages = new Map([["home", Home]]);

const DEFAULT_PAGE = "home";

function loadAuthFromLocal() {
  try {
    const data = localStorage.getItem(GOOGLE_AUTH_RESPONSE_KEY);
    return JSON.parse(data);
  } catch (e) {
    return undefined;
  }
}

function App() {
  const [page, setPage] = useState({ name: "home", params: {} });
  const [auth, setAuth] = useState(loadAuthFromLocal());
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
    <div className="App">
      <PageContext.Provider value={pageContextValue}>
        <AuthContext.Provider value={authContextValue}>
          <Suspense fallback={<div>Loading...</div>}>
            <PageComponent />
          </Suspense>
        </AuthContext.Provider>
      </PageContext.Provider>
    </div>
  );
}

export default App;

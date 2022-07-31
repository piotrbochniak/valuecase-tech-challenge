import React, { useState } from "react";
import classnames from "classnames";

import Home from "./pages/home/Home";
import Blocks from "./pages/blocks/Blocks";

import "./app.css";

const App = () => {
  const [page, setPage] = useState("home");
  const navigate = (newPage: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPage(newPage);
  };
  return (
    <div className="app">
      <nav className="app-header">
        <a
          href=""
          onClick={navigate("home")}
          className={classnames({ active: page === "home" })}
        >
          Home
        </a>
        |
        <a
          href=""
          onClick={navigate("blocks")}
          className={classnames({ active: page === "blocks" })}
        >
          Blocks
        </a>
      </nav>
      <div className="app-content">
        {page === "home" && <Home />}
        {page === "blocks" && <Blocks />}
      </div>
    </div>
  );
};

export default App;

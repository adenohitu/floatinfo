import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Setting } from "./components/Setting/Setting";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  </HashRouter>
);

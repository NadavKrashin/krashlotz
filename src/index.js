import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Piklotz from "./Piklotz";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/:person" element={<Piklotz />} />
    </Routes>
  </Router>
);

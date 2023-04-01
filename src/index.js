import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import "react-toastify/dist/ReactToastify.css";
import Worker from "./pages/Worker";
import Layout from './components/Layout';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Layout><Dashboard /></Layout>} />
          <Route index path="/worker" element={<Layout><Worker /></Layout>} />
          <Route index path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

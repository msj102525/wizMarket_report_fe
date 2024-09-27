import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Report from "./pages/Report/Report";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/wizmarket/report/:store_business_id" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import HomeTemplates from "./Templates";
import Detail from "./Page/DetailPage";
import Ticket from "./Page/Ticket";
import Login from "./Page/Login";
import Register from "./Page/register";
import ModalAccount from "./components/modals/ModalAccount";
import NotFound from "./Page/404Page";
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomeTemplates />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="detail/:maPhim" element={<Detail />}></Route>
          <Route path="ticket/:id" element={<Ticket />} />
          <Route path="history/:taiKhoan" element={<ModalAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <GlobalStyles />
      </Router>
    </ErrorBoundary>
  );
}

export default App;

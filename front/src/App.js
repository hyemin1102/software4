import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import CardAddressPage from "./components/CardAddressPage";
import CardAddressAllPage from "./components/CardAddressAllPage";
import BookListPage from "./components/BookListPage";
import BookDetailPage from "./components/BookDetailPage";
import BasketPage from "./components/BasketPage";
import OrderPage from "./components/OrderPage";
import OrderListPage from "./components/OrderListPage";
import OrderDetailPage from "./components/OrderDetailPage";

function App() {


  const user = JSON.parse(localStorage.getItem("user"));
  console.log("로그인한 유저 정보:", user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<LoginPage />} />
        <Route path="/card-address" element={<CardAddressPage />} />
        <Route path="/card-address/all" element={<CardAddressAllPage />} />
        <Route path="/book-list" element={<BookListPage />} />
        <Route path="/book-detail/:id" element={<BookDetailPage />} />
        <Route path="/book-basket" element={<BasketPage />} />
        <Route path="/order-page" element={<OrderPage />} />
        <Route path="/order-list" element={<OrderListPage />} />
        <Route path="/order-detail/:id" element={<OrderDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
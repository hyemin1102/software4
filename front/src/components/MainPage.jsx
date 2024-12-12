import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      <h1>도서 구매 사이트</h1>
      <Link to="/user" style={{ marginBottom: "10px" }}>로그인, 회원가입</Link>
      <Link to="/card-address" style={{ marginBottom: "10px" }}>카드, 주소 입력</Link>
      <Link to="/book-list" style={{ marginBottom: "10px" }}>책 List 보기</Link>
      <Link to="/book-basket" style={{ marginBottom: "10px" }}>장바구니 보기</Link>
      <Link to="/order-list" style={{ marginBottom: "10px" }}>주문내역 보기</Link>
    </div>
  );
};

export default MainPage;
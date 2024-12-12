import React, { useState, useEffect } from "react";
import axios from "axios";

const CardAddressPage = () => {
  const [userId, setUserId] = useState(null); // 로그인한 사용자 ID
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("신용카드");
  const [cardExpiration, setCardExpiration] = useState("");
  const [basicAdd, setBasicAdd] = useState("");
  const [detailAdd, setDetailAdd] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // localStorage에서 로그인된 사용자 정보 가져오기
    if (user) {
      setUserId(user.userId);
    } else {
      alert("로그인이 필요합니다.");
      window.location.href = "/login"; // 로그인 페이지로 리디렉션
    }
  }, []);

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/card", {
        userId,
        cardNumber,
        cardType,
        cardExpiration,
      });
      alert("카드가 성공적으로 등록되었습니다.");
      setCardNumber("");
      setCardExpiration("");
    } catch (error) {
      alert(error.response?.data.message || "카드 등록 실패");
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/address", {
        userId,
        basicAdd,
        detailAdd,
        postalCode,
      });
      alert("주소가 성공적으로 등록되었습니다.");
      setBasicAdd("");
      setDetailAdd("");
      setPostalCode("");
    } catch (error) {
      alert(error.response?.data.message || "주소 등록 실패");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <a href="/" style={{ marginBottom: "10px" }}>메인화면 돌아가기</a>
      <h1>카드 및 주소 등록</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleCardSubmit} style={{ marginRight: "20px" }}>
          <input
            type="text"
            placeholder="카드 번호 입력"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
            <option value="신용카드">신용카드</option>
            <option value="체크카드">체크카드</option>
            <option value="법인카드">법인카드</option>
          </select>
          <input
            type="text"
            placeholder="카드 유효기간"
            value={cardExpiration}
            onChange={(e) => setCardExpiration(e.target.value)}
          />
          <button type="submit">카드등록</button>
        </form>
        <form onSubmit={handleAddressSubmit}>
          <input
            type="text"
            placeholder="기본 배송지 입력"
            value={basicAdd}
            onChange={(e) => setBasicAdd(e.target.value)}
          />
          <input
            type="text"
            placeholder="상세 배송지 입력"
            value={detailAdd}
            onChange={(e) => setDetailAdd(e.target.value)}
          />
          <input
            type="text"
            placeholder="우편번호 입력"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <button type="submit">주소등록</button>
        </form>
      </div>
    </div>
  );
};

export default CardAddressPage;
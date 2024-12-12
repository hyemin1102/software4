import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { basket, totalAmount } = state || {};
  const [cards, setCards] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // 로그인한 사용자 정보 가져오기

  useEffect(() => {
    const fetchCardAndAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/card-address?userId=${user.userId}`
        );
        setCards(response.data.cards || []);
        setAddresses(response.data.addresses || []);
      } catch (error) {
        alert("카드 및 주소 정보를 불러오는 데 실패했습니다.");
      }
    };

    if (user && user.userId) {
      fetchCardAndAddress();
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [user.userId, navigate]); // 필요한 의존성만 추가

  const handleOrderSubmit = async () => {
    if (!selectedCard || !selectedAddress) {
      alert("카드와 주소를 선택해주세요.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/orders", {
        userId: user.userId,
        totalAmount,
        items: basket,
        card: JSON.parse(selectedCard),
        address: JSON.parse(selectedAddress),
      });

      alert("주문이 완료되었습니다.");
      navigate("/order-list"); // 주문 목록 페이지로 이동
    } catch (error) {
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  if (!basket || basket.length === 0 || !totalAmount) {
    return <p>장바구니 데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <div>
      <h1>주문 페이지</h1>
      <h2>총 금액: {totalAmount.toLocaleString()}원</h2>

      <div>
        <h3>배송지 선택</h3>
        {addresses.length > 0 ? (
          <select
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            <option value="">배송지를 선택하세요</option>
            {addresses.map((addr) => (
              <option key={addr.detail_add} value={JSON.stringify(addr)}>
                {addr.detail_add}
              </option>
            ))}
          </select>
        ) : (
          <p>등록된 배송지가 없습니다.</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>카드 선택</h3>
        {cards.length > 0 ? (
          <select
            value={selectedCard}
            onChange={(e) => setSelectedCard(e.target.value)}
          >
            <option value="">카드를 선택하세요</option>
            {cards.map((card) => (
              <option key={card.card_number} value={JSON.stringify(card)}>
                {card.card_number}
              </option>
            ))}
          </select>
        ) : (
          <p>등록된 카드가 없습니다.</p>
        )}
      </div>

      <button onClick={handleOrderSubmit} style={{ marginTop: "20px", padding: "10px 20px" }}>
        주문하기
      </button>
    </div>
  );
};

export default OrderPage;
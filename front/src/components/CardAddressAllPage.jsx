import React, { useEffect, useState } from "react";
import axios from "axios";

const CardAddressAllPage = () => {
  const [card, setCard] = useState([]);
  const [addr, setAddr] = useState([]);

  useEffect(() => {
    const fetchCardAndAddress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // localStorage에서 로그인한 사용자 정보 가져오기
        if (!user) {
          alert("로그인이 필요합니다.");
          window.location.href = "/login"; // 로그인 페이지로 리디렉션
          return;
        }

        const response = await axios.get(`http://localhost:4000/api/card-address?userId=${user.userId}`);
        setCard(response.data.cards);
        setAddr(response.data.addresses);
      } catch (error) {
        alert("카드 및 주소 정보를 불러오는 데 실패했습니다.");
      }
    };
    fetchCardAndAddress();
  }, []);

  return (
    <div>
      <a href="/" style={{ marginBottom: "10px" }}>메인화면 돌아가기</a>
      <h1>카드 및 주소 조회</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ marginRight: "20px" }}>
          <thead>
            <tr>
              <th>카드 번호</th>
              <th>카드 종류</th>
              <th>유효기간</th>
            </tr>
          </thead>
          <tbody>
            {card.length > 0 ? (
              card.map((c, index) => (
                <tr key={index}>
                  <td>{c.card_number}</td>
                  <td>{c.type_card}</td>
                  <td>{c.expriation_time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">등록된 카드 정보가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>기본 주소</th>
              <th>상세 주소</th>
              <th>우편번호</th>
            </tr>
          </thead>
          <tbody>
            {addr.length > 0 ? (
              addr.map((a, index) => (
                <tr key={index}>
                  <td>{a.basic_add}</td>
                  <td>{a.detail_add}</td>
                  <td>{a.postal_code}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">등록된 주소 정보가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardAddressAllPage;
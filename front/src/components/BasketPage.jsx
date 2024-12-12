import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BasketPage = () => {
  const [basket, setBasket] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // localStorage에서 사용자 정보 가져오기

  const fetchBasket = async () => {
    if (!user || !user.userId) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login"; // 로그인 페이지로 리디렉션
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/basket?userId=${user.userId}`);
      setBasket(response.data.items || []);
    } catch (error) {
      alert("장바구니를 불러오는 데 실패했습니다.");
    }
  };

  const handleRemoveFromBasket = async (bookId) => {
    try {
      await axios.post("http://localhost:4000/api/remove-from-basket", {
        userId: user.userId,
        bookId,
      });
      alert("장바구니에서 삭제되었습니다.");
      fetchBasket(); // 삭제 후 장바구니 갱신
    } catch (error) {
      alert("장바구니 삭제에 실패했습니다.");
    }
  };

  const handleCheckout = () => {
    if (basket.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }

    // 주문 페이지로 장바구니 데이터 전달
    navigate("/order-page", {
      state: { basket, totalAmount: basket.reduce((sum, item) => sum + item.price * item.quantity, 0) },
    });
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <a href="/" style={{ marginBottom: "10px" }}>메인화면 돌아가기</a>
      <h1>장바구니</h1>
      {basket.length > 0 ? (
        <>
          <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "70%" }}>
            <thead>
              <tr>
                <th>책 이름</th>
                <th>수량</th>
                <th>가격</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {basket.map((item) => (
                <tr key={item.bookId}>
                  <td>{item.bookName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => handleRemoveFromBasket(item.bookId)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            <button onClick={handleCheckout} style={{ padding: "10px 20px" }}>
              결제하기
            </button>
          </div>
        </>
      ) : (
        <p>장바구니가 비어 있습니다.</p>
      )}
    </div>
  );
};

export default BasketPage;
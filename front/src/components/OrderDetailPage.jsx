import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // 로그인된 사용자 정보 가져오기
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 이동
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        alert("주문 상세 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchOrder();
  }, [id, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <a href="/order-list" style={{ marginBottom: "10px" }}>주문 내역으로 돌아가기</a>
      <h1>주문 상세</h1>
      {order ? (
        <div>
          <p>주문 ID: {order.orderId}</p>
          <p>총 금액: {order.totalAmount}원</p>
          <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "50%" }}>
            <thead>
              <tr>
                <th>책 이름</th>
                <th>수량</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.bookName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>주문을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default OrderDetailPage;
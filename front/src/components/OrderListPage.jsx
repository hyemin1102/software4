import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")); // localStorage에서 사용자 정보 가져오기
  const userId = user?.userId;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setError("로그인이 필요합니다.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/orders?userId=${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError("주문 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchOrders();
  }, [userId]);

  if (error) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>{error}</div>;
  }

  if (!userId) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>로그인이 필요합니다.</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <a href="/" style={{ marginBottom: "10px" }}>메인화면 돌아가기</a>
      <div className="container">
        <h1>주문 내역</h1>
        {orders.length > 0 ? (
          <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "70%" }}>
            <thead>
              <tr>
                <th>총 가격</th>
                <th>주문 시간</th>
                <th>상세 보기</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.totalAmount}</td>
                  <td>
                    {new Date(order.orderTime)
                      .toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                      .replace(/\. /g, "-")
                      .replace(" ", "")}
                  </td>
                  <td>
                    <a href={`/order-detail/${order.orderId}`}>상세 보기</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>주문 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default OrderListPage;
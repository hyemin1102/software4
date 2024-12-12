import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [basketQuantity, setBasketQuantity] = useState(1);
  const [buyNowQuantity, setBuyNowQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem("user")); // 로그인한 사용자 정보 가져오기

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/books`);
        const foundBook = response.data.find((b) => b.bookId === parseInt(id));
        setBook(foundBook);
      } catch (error) {
        console.error("도서 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToBasket = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/add-to-basket", {
        userId: user.userId,
        bookId: book.bookId,
        quantity: basketQuantity,
      });
      alert("장바구니에 추가되었습니다.");
    } catch (error) {
      alert("장바구니 추가 실패: " + error.response?.data.message);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const total = buyNowQuantity * book.price;

    // 즉시 구매 시 OrderPage로 이동
    navigate("/order-page", {
      state: {
        basket: [
          {
            bookId: book.bookId,
            bookName: book.bookName,
            quantity: buyNowQuantity,
            price: book.price,
          },
        ],
        totalAmount: total,
      },
    });
  };

  if (!book) {
    return <p>도서를 찾을 수 없습니다.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <a href="/book-list" style={{ marginBottom: "10px" }}>도서 목록으로 돌아가기</a>
      <h1>도서 상세 정보</h1>
      <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "50%" }}>
        <thead>
          <tr>
            <th>책 이름</th>
            <th>가격</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{book.bookName}</td>
            <td>{book.price}</td>
            <td>{book.inventory}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            min="1"
            max={book.inventory}
            value={basketQuantity}
            onChange={(e) => setBasketQuantity(Number(e.target.value))}
            placeholder="장바구니 수량"
          />
          <button onClick={handleAddToBasket} style={{ marginLeft: "10px" }}>
            장바구니 추가
          </button>
        </div>
        <div>
          <input
            type="number"
            min="1"
            max={book.inventory}
            value={buyNowQuantity}
            onChange={(e) => setBuyNowQuantity(Number(e.target.value))}
            placeholder="즉시 구매 수량"
          />
          <button onClick={handleBuyNow} style={{ marginLeft: "10px" }}>
            즉시 구매
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
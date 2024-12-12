import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <a href="/" style={{ marginBottom: "10px" }}>메인화면 돌아가기</a>
      <h1>도서 목록</h1>
      <input
        type="text"
        placeholder="책 이름을 입력하여 검색하세요."
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          border: "2px solid #007BFF",
          borderRadius: "4px",
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
        }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ width: "70%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>책 이름</th>
              <th>수량</th>
              <th>가격</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.bookId}>
                <td>{book.bookName}</td>
                <td>{book.inventory}</td>
                <td>{book.price}</td>
                <td>
                  <Link to={`/book-detail/${book.bookId}`}>상세보기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookListPage;
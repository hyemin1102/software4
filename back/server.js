const express = require("express");
const cors = require("cors");
const { users, books, baskets, orders } = require("./data/mockData");

const app = express();
app.use(cors());
app.use(express.json());

// 회원가입 API
app.post("/api/signup", (req, res) => {
  const { userName, password } = req.body;

  // 중복 사용자 확인
  const existingUser = users.find((u) => u.userName === userName);
  if (existingUser) {
    return res.status(400).json({ status: "error", message: "이미 존재하는 사용자입니다." });
  }

  // 새 사용자 추가
  const newUser = {
    userId: users.length + 1,
    userName,
    password,
    basket: [],
    orders: [],
  };
  users.push(newUser); // mockData.js의 users 배열에 직접 추가

  res.json({ status: "success", message: "회원가입 성공", data: newUser });
});

// 로그인 API
app.post("/api/login", (req, res) => {
  const { userName, password } = req.body;
  const user = users.find((u) => u.userName === userName && u.password === password);
  if (user) {
    res.json({ message: "로그인 성공", user });
  } else {
    res.status(401).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
  }
});

// 책 목록 API
app.get("/api/books", (req, res) => {
  res.json(books);
});


// 장바구니 조회 API
app.get("/api/basket", (req, res) => {
  const { userId } = req.query;
  const basket = baskets.find((b) => b.userId === Number(userId));

  if (basket) {
    res.json(basket);
  } else {
    res.status(404).json({ message: "장바구니가 비어 있거나 해당 사용자가 없습니다." });
  }
});

// 장바구니 추가 API
app.post("/api/add-to-basket", (req, res) => {
  const { userId, bookId, quantity } = req.body;
  const user = users.find((u) => u.userId === userId);
  const book = books.find((b) => b.bookId === bookId);

  if (!user || !book) {
    return res.status(400).json({ message: "사용자 또는 책 정보를 찾을 수 없습니다." });
  }

  if (book.inventory < quantity) {
    return res.status(400).json({
      message: `재고 부족: 현재 재고는 ${book.inventory}개입니다.`,
    });
  }

  book.inventory -= quantity;

  const basketItem = { bookId, bookName: book.bookName, quantity, price: book.price };
  const userBasket = baskets.find((b) => b.userId === userId);

  if (userBasket) {
    const existingItem = userBasket.items.find((item) => item.bookId === bookId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      userBasket.items.push(basketItem);
    }
  } else {
    baskets.push({ userId, items: [basketItem] });
  }

  res.json({ message: "장바구니에 추가되었습니다." });
});

// 장바구니에서 아이템 삭제 API
app.post("/api/remove-from-basket", (req, res) => {
  const { userId, bookId } = req.body;

  // 해당 사용자의 장바구니를 찾습니다.
  const userBasket = baskets.find((b) => b.userId === Number(userId));

  if (!userBasket) {
    return res.status(404).json({ message: "해당 사용자의 장바구니가 없습니다." });
  }

  // 장바구니에서 해당 책을 제거합니다.
  const initialLength = userBasket.items.length;
  userBasket.items = userBasket.items.filter((item) => item.bookId !== bookId);

  if (userBasket.items.length === initialLength) {
    return res.status(404).json({ message: "장바구니에 해당 책이 없습니다." });
  }

  res.json({ message: "장바구니에서 아이템이 삭제되었습니다.", basket: userBasket });
});

// 주문 API
app.post("/api/orders", (req, res) => {
  const { userId, totalAmount, items, address, card } = req.body;
  const user = users.find((u) => u.userId === userId);
  console.log("새로운 주문 데이터:", { userId, totalAmount, items, address, card });

  if (!user) {
    return res.status(400).json({ message: "잘못된 사용자 요청" });
  }

  const newOrder = {
    orderId: orders.length + 1,
    userId,
    totalAmount,
    items,
    address,
    card,
    orderTime: new Date().toISOString(),
  };
  orders.push(newOrder);

  // 사용자의 orders 속성에도 추가 (필요 시)
  user.orders.push(newOrder);

  console.log("현재 주문 목록:", orders);

  // 장바구니 비우기
  const userBasket = baskets.find((b) => b.userId === userId);
  if (userBasket) {
    userBasket.items = [];
  }

  res.json({ message: "주문이 완료되었습니다.", order: newOrder });
});

// 주문 목록 조회 API
app.get("/api/orders", (req, res) => {
  const { userId } = req.query;

  if (!userId || isNaN(Number(userId))) {
    return res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
  }

  const userOrders = orders.filter((o) => o.userId === Number(userId));

  // 주문 정보를 응답으로 반환
  res.json(userOrders);
});

// 특정 주문 상세 조회 API
app.get("/api/orders/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "유효하지 않은 주문 ID입니다." });
  }

  const order = orders.find((o) => o.orderId === parseInt(id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "주문을 찾을 수 없습니다." });
  }
});

// 카드 등록
app.post("/api/card", (req, res) => {
  const { userId, cardNumber, cardType, cardExpiration } = req.body;
  const user = users.find((u) => u.userId === userId);

  if (user) {
    const newCard = { card_number: cardNumber, type_card: cardType, expriation_time: cardExpiration };
    user.card = user.card || [];
    user.card.push(newCard);
    res.json({ message: "카드가 등록되었습니다.", card: newCard });
  } else {
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }
});

// 배송지 추가 
app.post("/api/address", (req, res) => {
  const { userId, basicAdd, detailAdd, postalCode } = req.body;
  const user = users.find((u) => u.userId === userId);

  if (user) {
    const newAddress = { basic_add: basicAdd, detail_add: detailAdd, postal_code: postalCode };
    user.address = user.address || [];
    user.address.push(newAddress);
    res.json({ message: "주소가 등록되었습니다.", address: newAddress });
  } else {
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }
});

// 카드와 배송지 조회 API
app.get("/api/card-address", (req, res) => {
  const { userId } = req.query;
  const user = users.find((u) => u.userId === Number(userId));
  if (!user) {
    return res.status(400).json({ message: "사용자를 찾을 수 없습니다." });
  }
  res.json({
    cards: user.card || [],
    addresses: user.address || [],
  });
});

// 서버 실행
const PORT = 4000;
app.listen(PORT, () => console.log(`서버가 ${PORT} 에서 실행 중입니다.`));
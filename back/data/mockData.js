// 회원 데이터
const users = [
  {
    userId: 1,
    userName: "11",
    password: "111",
    card: [],
    address: [],
    basket: [],
    orders: [],
  },
  {
    userId: 2,
    userName: "김혜민",
    password: "123",
    card: [],
    address: [],
    basket: [],
    orders: [],
  },
];

// 책 데이터
const books = [
  {
    bookId: 1,
    bookName: "언젠가 우리가 같은 별을 바라본다면",
    inventory: 100,
    price: 10800,
  },
  {
    bookId: 2,
    bookName: "영원한 친구",
    inventory: 100,
    price: 17820,
  },
  {
    bookId: 3,
    bookName: "모순",
    inventory: 100,
    price: 13000,
  },
  {
    bookId: 4,
    bookName: "머니트렌드 2025",
    inventory: 100,
    price: 11500,
  },
  {
    bookId: 5,
    bookName: "언젠가",
    inventory: 100,
    price: 13000,
  },
  {
    bookId: 6,
    bookName: "모구모구",
    inventory: 100,
    price: 12000,
  },
  {
    bookId: 7,
    bookName: "역행자",
    inventory: 100,
    price: 12000,
  },
];

// 장바구니 데이터
const baskets = [
  {
    basketId: 1,
    userId: 1,
    items: [
      {
        bookId: 1,
        bookName: "언젠가 우리가 같은 별을 바라본다면",
        quantity: 2,
        price: 10800,
      },
    ],
  },
  {
    basketId: 2,
    userId: 2,
    items: [],
  },
];

// 주문 데이터
const orders = [
  {
    orderId: 1,
    userId: 1,
    totalAmount: 21600,
    orderTime: new Date().toISOString(),
    items: [
      {
        bookId: 1,
        bookName: "언젠가 우리가 같은 별을 바라본다면",
        quantity: 2,
        price: 10800,
      },
    ],
    address: {
      basicAdd: "서울",
      detailAdd: "역삼동",
      postalCode: "06292",
    },
    card: {
      cardNumber: "1234567",
      typeCard: "신용카드",
      expriationTime: "1212",
    },
  },
];

module.exports = { users, books, baskets, orders };
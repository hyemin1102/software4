import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        userName: loginName,
        password: loginPassword,
      });

      const user = response.data.user;
      alert("로그인 성공!");

      // 사용자 정보를 localStorage에 저장
      localStorage.setItem("user", JSON.stringify(user));

      // 메인 페이지로 이동
      window.location.href = "/";
    } catch (error) {
      alert("로그인 실패: " + error.response?.data.message);
    }
  };

  // 회원가입 처리
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/signup", {
        userName: signupName,
        password: signupPassword,
      });

      alert("회원가입 성공!");
      // 회원가입 후 메인 페이지로 이동
      window.location.href = "/";
    } catch (error) {
      alert("회원가입 실패: " + error.response?.data.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <a href="/" style={{ marginBottom: "10px" }}>메인화면 돌아가기</a>
      <h1>로그인 및 회원가입</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} style={{ marginRight: "20px" }}>
          <h2>로그인</h2>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">로그인</button>
        </form>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSignup}>
          <h2>회원가입</h2>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
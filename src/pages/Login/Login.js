import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const mockApiCall = async (uname, pword) => {
    // 1초 후 성공적인 응답을 시뮬레이션
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (uname === "user" && pword === "password") {
          resolve({ success: true });
        } else {
          reject({ success: false, message: "Invalid credentials" });
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await mockApiCall(username, password);
      if (response.success) {
        console.log("Login Successful");
        // 로그인 후의 처리를 추가 (예: 페이지 리다이렉트)
      }
    } catch (error) {
      setErrorMessage(error.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;

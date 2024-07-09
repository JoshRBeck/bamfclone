import { useState } from "react";
import axios from "axios";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5173/login", {
        identifier,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Login Successful");
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
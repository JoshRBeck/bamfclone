import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    const auth = getAuth(); // Initialize Firebase auth instance

    try {
      // Sign in with email and password using Firebase
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
    } catch (err: unknown) {
      // Handle errors with type assertion
      if (err instanceof Error) {
        setError(err.message); // Set the error message from the caught Error
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
};

export default Login;

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth(); // Initialize Firebase auth instance

    try {
      // Create user with email and password using Firebase
      await createUserWithEmailAndPassword( auth, email, password);
      alert("Sign Up Successful");
    } catch (err: unknown) {
      if (err instanceof Error) {
      setError(err.message); // Handle any Firebase errors
      } else {
        setError("An unknown error occured.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUp;

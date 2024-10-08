import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const Protected: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(); // Get the Firebase Auth instance

    const fetchData = async () => {
      // Check if a user is authenticated
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Get the Firebase token for authenticated requests
          const token = await user.getIdToken();

          try {
            const response = await axios.get("http://localhost:5173/protected", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setData(response.data.message || "Protected data fetched successfully.");
          } catch (err) {
            setError("Failed to fetch protected data.");
          }
        } else {
          setError("No user authenticated. Please log in.");
        }
        setLoading(false);
      });
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>{data}</div>;
};

export default Protected;

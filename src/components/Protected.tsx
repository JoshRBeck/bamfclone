import { useEffect, useState } from "react";
import axios from "axios";

const Protected: React.FC = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:5173/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(
          response.data.message || "Protected data fetched successfully."
        );
      } catch (err) {
        alert("Failed to fetch protected data");
      }
    };

    fetchData();
  }, []);

  return <div>{data}</div>;
};

export default Protected;

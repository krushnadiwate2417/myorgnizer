import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [hidden, setHidden] = useState("hide");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHidden("");
    try {
      const response = await fetch(
        "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response) {
        throw new Error("Something went wrong in Fetching");
      }

      const result = await response.json();
      if (result.msg == "success") {
        navigate("/home");
      }
      setHidden("hide");
    } catch (error) {
      console.log("Error in Login", error);
    }
  };

  return (
    <>
      <div className={hidden}>
        <Shimmer />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter Email ID</label>
          <input
            placeholder="Type here ..."
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;

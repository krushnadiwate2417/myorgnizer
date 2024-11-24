import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";
import Form from "./Reuseables/Form";

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
      if (result?.msg == "success" && result?.isemailerified == true) {
        localStorage.setItem("userToken", result.token);
        console.log("added");
        navigate("/home");
        console.log(result);
      }

      if (result?.msg == "success" && result?.isemailerified == false) {
        navigate("/verify");
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
        <Form
          email={email}
          setEmail={setEmail}
          action={"Log In"}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Login;

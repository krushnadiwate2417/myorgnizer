import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";
import Form from "./Reuseables/Form";
import post from "./jsFunctions/post";

const Login = () => {
  const [email, setEmail] = useState("");
  const [hidden, setHidden] = useState("hide");
  const navigate = useNavigate();

  const api =
    "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHidden("");
    const result = await post(api, { email });
    if (result?.message == "success" && result?.isemailerified == true) {
      localStorage.setItem("userToken", result.token);
      sessionStorage.setItem("userToken", result.token);
      console.log("added");
      navigate("/home");
      console.log(result);
    }
    if (result?.msg == "success" && !result?.isemailerified) {
      navigate("/verify");
    }
  };

  return (
    <>
      <div className={hidden}>
        <Shimmer />
      </div>
      <div className="login-form-grid-c">
        <div className="login-left-div">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="signup-btn-grid"
          >
            Sign Up
          </button>
        </div>
        <div className="Login-flex-c">
          <Form
            email={email}
            setEmail={setEmail}
            action={"Log In"}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Login;

import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";
import Form from "./Reuseables/Form";
import post from "./jsFunctions/post";
import {ToastContainer} from "react-toastify"
import UserContext from "./Context/UserContext";

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
      navigate("/home");
    }
    if (result?.msg == "success" && !result?.isemailerified) {
      navigate("/verify");
    }
  };

  return (
    <>
          <ToastContainer/>
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
          <div className="login-heading"><h1>Already Have an Account ?</h1>
            <h2>Please Login Here</h2>
          </div>
          <div className="login-form">
          <Form
            email={email}
            setEmail={setEmail}
            action={"Log In"}
            handleSubmit={handleSubmit}
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

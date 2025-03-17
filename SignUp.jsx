import { useState,useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import Form from "./Reuseables/Form";
import post from "./jsFunctions/post";
import UserContext from "./Context/UserContext";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [errText, setErrText] = useState("");
  const [hiding, sethiding] = useState("hide");
  const [hiding2, setHiding2] = useState("hide");
  const path = useLocation();

  const navitage = useNavigate();
  const api =
    "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/organizemeuser";
  const handleSubmit = async (e) => {
    e.preventDefault();

    sethiding("");
    const result = await post(api, { email }, path.pathname);
    if (result?.data?.newuser?.isemailerified == false) {
      navitage("/verify");
    }
    if (!result) {
      sethiding("hide");
      setHiding2("");
      setErrText("Account already Signed Up, Try ");
    }
  };

  return (
    <>
      <div className={hiding}>
        <Shimmer />
      </div>
      <div className="signup-grid-c" >
        <div className="SignUp-flex-c">
          <div className="signUp-heading">
            <h1>New to My Organizer ?</h1>
            <h2>Please Sign Up Here</h2>
          </div>
          <div>
          <Form
            action={"Sign Up"}
            handleSubmit={handleSubmit}
            setEmail={setEmail}
            email={email}
          />
          </div>
          <div className="errP">
            <h5 className={`signup-p ${hiding2}`}>
              {errText}
              <Link to={"/login"}>Login</Link>
            </h5>
          </div>
        </div>
        <div className="signup-grid-right">
          <button
            onClick={() => {
              navitage("/login");
            }}
            className="login-btn-grid"
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

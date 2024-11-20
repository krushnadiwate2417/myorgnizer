import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [errText, setErrText] = useState("");

  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState([]);
  const [hiding, sethiding] = useState("hide");
  const [hiding2, setHiding2] = useState("hide");

  const navitage = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    sethiding("");
    try {
      const response = await fetch(
        "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/organizemeuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const result = await response.json();
      console.log(result);
      setVerify(result);
      if (result?.data?.newuser?.isemailerified === false) {
        navitage("/verify");
      }
    } catch (error) {
      setLoading(false);
      sethiding("hide");
      setHiding2("");
      console.error(error);
      setErrText("Account already Signed Up, Try ");
    }
  };

  return (
    <>
      <div className={hiding}>
        <Shimmer />
      </div>
      <div className="SignUp-flex-c">
        <form onSubmit={handleSubmit} className="SignUp-gric-c">
          <div>
            <label className="signup-label">Email Id</label>
          </div>
          <div>
            <input
              className="signup-input"
              placeholder="Enter here..."
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <p className={`signup-p ${hiding2}`}>
              {errText}
              <Link to={"/login"}>Login</Link>
            </p>
          </div>
          <div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;

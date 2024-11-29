import { useState } from "react";
import { useNavigate } from "react-router";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import Form from "./Reuseables/Form";
import push from "./jsFunctions/push";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [errText, setErrText] = useState("");
  const [hiding, sethiding] = useState("hide");
  const [hiding2, setHiding2] = useState("hide");

  const navitage = useNavigate();
  const api =
    "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/organizemeuser";
  const handleSubmit = async (e) => {
    e.preventDefault();

    sethiding("");
    const result = await push(api, { email });
    if (result?.data?.newuser?.isemailerified == false) {
      navitage("/verify");
    }
    if (!result) {
      sethiding("hide");
      setHiding2("");
      setErrText("Account already Signed Up, Try ");
    }

    // try {
    //   const response = await fetch(
    //     "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/organizemeuser",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         // "Authorization": "bearar "
    //       },
    //       body: JSON.stringify({ email }),
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error("Something went wrong");
    //   }
    //   const result = await response.json();
    //   console.log(result);
    //   if (result?.data?.newuser?.isemailerified === false) {
    //     navitage("/verify");
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   sethiding("hide");
    //   setHiding2("");
    //   console.error(error);
    //   setErrText("Account already Signed Up, Try ");
    // }
  };

  return (
    <>
      <div className={hiding}>
        <Shimmer />
      </div>
      <div className="SignUp-flex-c">
        <Form
          action={"Sign Up"}
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          email={email}
        />
        <p className={`signup-p ${hiding2}`}>
          {errText}
          <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </>
  );
};

export default SignUpPage;

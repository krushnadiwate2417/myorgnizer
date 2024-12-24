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
    // try {
    //   const response = await fetch(
    //     "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/login",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email }),
    //     }
    //   );

    //   if (!response) {
    //     throw new Error("Something went wrong in Fetching");
    //   }

    //   const result = await response.json();
    // if (result?.msg == "success" && result?.isemailerified == true) {
    //   localStorage.setItem("userToken", result.token);
    //   console.log("added");
    //   navigate("/home");
    //   console.log(result);
    // }

    // if (result?.msg == "success" && result?.isemailerified == false) {
    //   navigate("/verify");
    // }
    //   setHidden("hide");
    // } catch (error) {
    //   console.log("Error in Login", error);
    // }
  };

  return (
    <>
      <div className={hidden}>
        <Shimmer />
      </div>
      <div className="Login-flex-c">
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

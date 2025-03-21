import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import post from "../jsFunctions/post";
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Shimmer from "../Shimmer";

const Otp = () => {
  const [values, setValues] = useState(["", "", "", "", ""]); // State for the input values
  const navigate = useNavigate();
  const inputs = useRef([]); // References for the input fields
  const { data } = useContext(UserContext);
  const [shimmerStat, setShimmerStat] = useState(false);

  const email = data.email;
  const val = {
    email: email,
    otp: values.join(""),
  };
  const api =
    "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/orguserverifyotp";
  const handleOtp = async () => {

    const result = await post(api, val);
    if(result){
      setShimmerStat(false)
    }
    if (result.message === "OTP verified successfully!!") {
      toast.success("Otp Verified Successfully",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      navigate("/login");
    }
    // try {
    //   const response = await fetch(
    //     "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/orguserverifyotp",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email: email, otp: values.join("") }),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Error in Fetching");
    //   }

    //   const result = await response.json();
    //   if (result.message === "OTP verified successfully!!") {
    //     navigate("/home");
    //   }
    // } catch (error) {

    // }
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;

    // Allow only single character input
    if (value.length > 1) return;

    // Update the value in the state
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Move to the next input if there's a next one
    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace: move to the previous field if empty
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return shimmerStat ? <Shimmer/> : (
    <>
      <div className="otp-div-c">
      <div>
        {values.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            maxLength="1" // Ensures only 1 character is entered
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputs.current[index] = el)} // Assign refs to inputs
            style={{
              width: "60px",
              height: "60px",
              textAlign: "center",
              marginRight: "5px",
              border: "2px solid",
              borderColor: "orangered",
            }}
          />
        ))}
      </div>
      <div className="verify-otp-btn">
        <button
          onClick={() => {
            setShimmerStat(true)
            handleOtp();
          }}
        >
          Verify Otp
        </button>
      </div>
      </div>
    </>
  );
};

export default Otp;

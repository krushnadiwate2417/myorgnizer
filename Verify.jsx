import UserContext from "./Context/UserContext";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Timer from "./Reuseables/Timer";
import post from "./jsFunctions/post";
import Shimmer from "./Shimmer";
const Verify = () => {
  const [hide, setHide] = useState("hide");
  const [disable, setDisable] = useState(false);
  const [btnMsg,setBtnMsg] = useState("Click Here to Verify")
  const [start, setStart] = useState(false);
  const [shimmerStat, setShimmerStat] = useState(false);
  const [otpSentMsg,setOtpSentMsg] = useState(""); 
  const { data } = useContext(UserContext);
  const path = useLocation();
  const email = data.email;
  const api =
    "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/orguserrequestotp";

  const handleVerify = async () => {
    const result = await post(api, { email }, path.pathname);
    if(result){
      setShimmerStat(false);
    }
    // try {
    //   const response = await fetch(
    //     "https://rgstudentsmanagementbackend.onrender.com/api/v1/organizemeusers/orguserrequestotp",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email }),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Error in Fetching");
    //   }
    //   const result = await response.json();
    //   console.log(result);
    // } catch (error) {
    //   console.log("Error in Verify" + error);
    // }
  };
  console.log(disable);
  return shimmerStat ? <Shimmer/> : (
    <>
      <div className="verify-flex">
        <div className="verify-grid">
          <div>
            <h1 className="verify-h1">Please Verify Your Email</h1>
          </div>
          <div className="verify-btn-div">
            <button
              disabled={disable}
              className="verify-btn"
              onClick={async() => {
                setHide("");
                setDisable(true);
                setShimmerStat(true)
                setStart(true);
                setBtnMsg("Resend Otp")
                setOtpSentMsg(`OTP has been sent to ${data.email}. Please Verify Your Email by entering Valid OTP.`)
                await handleVerify();
                console.log(data.email);
              }}
            >
              {btnMsg}
            </button>
          </div>
          <div>
            <p>{otpSentMsg}</p>
          </div>
          <div>
            {/* <input placeholder="ENTER OTP..." className={hide} />
            <button type="submit" className={hide}>
              Submit
            </button> */}
            <div className={hide}>
              <Timer
                setDisable={setDisable}
                start={start}
                setStart={setStart}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;

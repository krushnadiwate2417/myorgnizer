import { useState } from "react";
import Timer from "./Timer";

const Verify = () => {
  const [hide, setHide] = useState("hide");
  const [disable, setDisable] = useState(false);
  const [start, setStart] = useState(false);

  console.log("IN VERIFY", start);
  return (
    <>
      <div className="SignUp-flex-c">
        <div className="verify-grid">
          <div>
            <h1 className="verify-h1">Please Verify Your Email</h1>
          </div>
          <div className="verify-btn-div">
            <button
              disabled={disable}
              className="verify-btn"
              onClick={() => {
                setHide("");
                setDisable(true);
                setStart(true);
              }}
            >
              Click Here to Verify
            </button>
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

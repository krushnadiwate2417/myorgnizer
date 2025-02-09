import { useState, useEffect } from "react";
import Otp from "./Input-Otp";

const Timer = ({ setDisable, start, setStart }) => {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    console.log(start);
    if (!start) return;
    setSeconds(60);
    const interval = setInterval(() => {
      setSeconds((currSec) => {
        if (currSec <= 1) {
          clearInterval(interval);
          setDisable(false);
          return 0;
        } else {
          return currSec - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  // useEffect(() => {
  //   if (!isRunning) {
  //     setDisable(false);
  //     setStart(false);
  //   }
  // }, [isRunning, setDisable]);

  return (
    <>
      <Otp />
      <p>Timer : {seconds} seconds remaining</p>
    </>
  );
};

export default Timer;

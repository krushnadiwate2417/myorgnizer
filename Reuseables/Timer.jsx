import { useState, useEffect } from "react";
import Otp from "./Input-Otp";

const Timer = ({ setDisable, start, setStart }) => {
  const [seconds, setSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!start) return;
    setSeconds(5);
    setIsRunning(true);
    const interval = setInterval(() => {
      setSeconds((currSec) => {
        if (currSec <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        } else {
          return currSec - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  useEffect(() => {
    if (!isRunning) {
      setDisable(false);
      setStart(false);
    }
  }, [isRunning, setDisable]);

  return (
    <>
      <Otp />
      <p>Timer : {seconds}</p>
    </>
  );
};

export default Timer;

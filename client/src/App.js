import React, { useEffect, useState } from "react";
import "./App.css";
import  MapContainer  from "./Components/Map";
import Button from "@mui/material/Button";

let tCount = 0;

function App() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`2022-02-27T11:45:00`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

 function TeaCount() {
   tCount +=1;
 }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div className="App">
      <h1>Hackathon February {year} Countdown</h1>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      <div className="tea-count">
        {" "}
        <Button variant="outlined" onClick={TeaCount}>
          Tea Counter
        </Button>
        <h2>{tCount}</h2>
      </div>
        <MapContainer />
    </div>
  );
}

export default App;

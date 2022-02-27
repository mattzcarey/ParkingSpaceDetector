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
      <h1>Boeing x CSS Hackathon Countdown</h1>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      <h4>Join our Spotify Session</h4>
      <div>
        <img src="spotify-session-qr.png" alt="Spotify QR code" className="photoqr" />
      </div>
      <div className="tea-count">
        <Button variant="outlined" onClick={TeaCount}>
          Tea Counter
        </Button>
        <h2>{tCount}</h2>
      </div>
      <div className="container">
        <MapContainer />
      </div>
    </div>
  );
}

export default App;

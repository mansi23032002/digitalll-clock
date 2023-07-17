import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState('');
  const [stopwatchActive, setStopwatchActive] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [alarmActive, setAlarmActive] = useState(false);
  const [worldClocks, setWorldClocks] = useState([]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      setTime(`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const handleStartStopwatch = () => {
    if (!stopwatchActive) {
      setStopwatchTime(0);
    }
    setStopwatchActive(!stopwatchActive);
  };

  const stopStopwatch = () => {
    if (stopwatchActive) {
      setStopwatchActive(false);
    }
  };

  useEffect(() => {
    let interval;
    if (stopwatchActive) {
      interval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stopwatchActive]);

  const startCountdown = () => {
    if (!countdownActive) {
      const input = parseInt(prompt('Enter countdown time (in seconds):'));
      if (isNaN(input) || input <= 0) {
        alert('Invalid countdown time!');
        return;
      }
      setCountdownTime(input);
      setCountdownActive(true);
    }
  };

  useEffect(() => {
    console.log(countdownTime)
    let interval;
    if (countdownActive && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (countdownTime === 0  && countdownActive) {
      alert('Countdown timer has expired!');
      setCountdownActive(false);
    }
    return () => clearInterval(interval);
  }, [countdownActive, countdownTime]);

  const setAlarm = () => {
    if (!alarmActive) {
      const input = prompt('Enter the alarm time (in HH:MM format):');
      const [hours, minutes] = input.split(':');
      const validTime = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
      if (!validTime.test(input)) {
        alert('Invalid alarm time!');
        return;
      }
      const alarmTime = new Date();
      alarmTime.setHours(hours);
      alarmTime.setMinutes(minutes);
      alarmTime.setSeconds(0);
      const currentTime = new Date();
      if (alarmTime < currentTime) {
        alarmTime.setDate(alarmTime.getDate() + 1);
      }
      const timeDifference = alarmTime - currentTime;
      setTimeout(() => {
        alert('Alarm!');
        setAlarmActive(false);
      }, timeDifference);
      setAlarmActive(true);
    }
  };

  const addWorldClock = () => {
    const city = prompt('Enter city name:');
    if (city) {
      setWorldClocks((prevClocks) => [...prevClocks, { city }]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedWorldClocks = worldClocks.map((clock) => {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        return { ...clock, time: formattedTime };
      });
      setWorldClocks(updatedWorldClocks);
    }, 1000);

    return () => clearInterval(interval);
  }, [worldClocks]);

  return (
    <div className="container">
      <h1 className="clock">{time}</h1>
      <div className="features">
        
        {/* <button className="feature" onClick={handleStartStopwatch}>
          {stopwatchActive ? 'Reset' : 'Start Stopwatch'}
        </button>
        <button className="feature" onClick={stopStopwatch}>
          Stop Stopwatch
        </button> */}

        {stopwatchActive ? <><button className="feature" onClick={stopStopwatch}>
          Stop
        </button> </>:<> <button className="feature" onClick={handleStartStopwatch}>Stopwatch</button></>}



        <button className="feature" onClick={startCountdown}>
          Countdown Timer
        </button>
        <button className="feature" onClick={setAlarm}>
          Alarm
        </button>
        <button className="feature" onClick={addWorldClock}>
          Add World Clock
        </button>
      </div>
      {stopwatchActive && <h2 className="stopwatch">{stopwatchTime}</h2>}
      {countdownActive && <h2 className="countdown">{countdownTime}</h2>}
      {worldClocks.map((clock, index) => (
        <h2 className="world-clock" key={index}>
          {clock.city}: {clock.time}
        </h2>
      ))}
    </div>
  );
}

export default App;

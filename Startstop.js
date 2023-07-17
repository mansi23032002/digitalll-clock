 // Start/stop the stopwatch
  const handleStopwatch = () => {
    setStopwatchActive(!stopwatchActive);
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    setStopwatchTime(0);
    setStopwatchActive(false);
  };

  // Update stopwatch time every millisecond
  useEffect(() => {
    let interval;
    if (stopwatchActive) {
      interval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [stopwatchActive]);
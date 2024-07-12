import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clock = () => {
  const [time, setTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone/Etc/UTC');
        setTime(response.data.datetime);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTime();

    const interval = setInterval(fetchTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Current Time</h1>
      <p>{time ? new Date(time).toTimeString() : 'Loading...'}</p>
    </div>
  );
};

export default Clock;

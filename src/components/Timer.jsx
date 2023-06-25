import React, { useEffect, useState } from 'react';
import './Timer.scss';

function Timer(props) {
  const TIMER_RADIUS = 120;
  const DASH_ARRAY = 2 * Math.PI * TIMER_RADIUS;
  const timeIntervalDelay = 50; //ms
  let givenSeconds = props.seconds || 10;
  const [rotation, setRotation] = useState(DASH_ARRAY);
  const [timeMs, setTimeMs] = useState(props.seconds * 1000);
  const [totalTime, setTotalTime] = useState(props.seconds * 1000);

  let decreasePerInterval = DASH_ARRAY * (timeIntervalDelay / timeMs);
  useEffect(() => {
    setTimeMs(givenSeconds * 1000);
  }, [props]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rotation > 0) {
        setTimeMs((t) => t - timeIntervalDelay);
        setRotation((value) => value - decreasePerInterval);
      }
    }, timeIntervalDelay);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="timer-box">
        <span className="timer-text">
          {' '}
          {timeMs / 1000 > 0 ? Math.floor(timeMs / 1000) : 0}{' '}
        </span>
        {/* <div className="test">hello world</div> */}
        {/* <p>{rotation}</p> */}
        <svg className="timer-circle-svg">
          <circle
            cx={TIMER_RADIUS + 10}
            cy={TIMER_RADIUS + 10}
            r={TIMER_RADIUS}
            preserveAspectRatio="xMidYMin"
            strokeLinecap="round"
            className="timer-circle"
            style={{ strokeDasharray: `${rotation} ${DASH_ARRAY}` }}
          />
          <circle
            cx={TIMER_RADIUS + 10}
            cy={TIMER_RADIUS + 10}
            r={TIMER_RADIUS - 5}
            className="timer-innerCircle"
          />
        </svg>
      </div>
      <button
        onClick={() => {
          setRotation(() => DASH_ARRAY);
          setTimeMs(20000);
        }}
        value="click"
      >
        Reset
      </button>
    </>
  );
}

export default Timer;

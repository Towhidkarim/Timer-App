import React, { useContext, useState } from 'react';
import './Timer.scss';
import { Typography, Box } from '@mui/material';
import Timestamp from '../Timestamp/Timestamp';
import AppTheme from '../Theme/AppTheme';

const TimerV2 = ({ time, progress }) => {
  const TIMER_RADIUS = 120;
  const DASH_ARRAY = 2 * Math.PI * TIMER_RADIUS;
  const THEME = useContext(AppTheme);

  return (
    <>
      <Box className='timer-box'>
        <span className='timer-text'>
          <Typography variant='h2'>
            <Timestamp mseconds={time} />
          </Typography>
        </span>
        <svg className='timer-circle-svg'>
          <circle
            cx={TIMER_RADIUS + 10}
            cy={TIMER_RADIUS + 10}
            r={TIMER_RADIUS}
            className='timer-innerCircle'
            style={{
              stroke: THEME.palette.main,
            }}
          />
          <circle
            cx={TIMER_RADIUS + 10}
            cy={TIMER_RADIUS + 10}
            r={TIMER_RADIUS}
            preserveAspectRatio='xMidYMin'
            strokeLinecap='round'
            className='timer-circle'
            style={{
              strokeDasharray: `${DASH_ARRAY * (progress / 100)} ${DASH_ARRAY}`,
              stroke: THEME.palette.main,
            }}
          />
        </svg>
      </Box>
    </>
  );
};

export default TimerV2;

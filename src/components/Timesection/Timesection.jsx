import { Box, IconButton, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import TimerV2 from '../TimerV2/TimerV2';
import './Timersection.scss';
import AppTheme from '../Theme/AppTheme';
import { TimeConfig } from '../../Utils/GlobalConfig';
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
  SkipNextRounded,
  SkipPreviousRounded,
} from '@mui/icons-material';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Timestamp from '../Timestamp/Timestamp';
import { playBeep } from '../../Utils/AudioPlayer';

const Timesection = () => {
  const {
    setActiveIndex,
    activeIndex,
    tasks,
    getConfig,
    getAudioMode,
    setAudioMode,
  } = useContext(TimeConfig);
  const [animate, setAnimate] = useState(true);
  const [timeMs, setTimeMs] = useState(tasks[activeIndex].duration * 1000);
  const [duration, setDuration] = useState(tasks[activeIndex].duration * 1000);
  const [isPaused, setPause] = useState(true);
  const [intervalPeriod, setInintervalPeriod] = useState(false);
  const theme = useContext(AppTheme);
  const currentColor = intervalPeriod
    ? theme.palette.offset
    : theme.palette.main;

  const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b},`;
  };

  const goBack = () => {
    setInintervalPeriod(false);
    setActiveIndex((i) => (i === 0 ? 0 : i - 1));
  };
  const goNext = () => {
    setInintervalPeriod(false);
    setActiveIndex((i) => (tasks[i + 1] === undefined ? 0 : i + 1));
  };
  const reset = () => {
    setPause(true);
    setActiveIndex(0);
    setTimeMs(0);
    setDuration(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) setTimeMs((t) => (t > 0 ? t - 100 : 0));
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [isPaused]);
  useEffect(() => {
    if (timeMs % 1000 === 0) {
      if (timeMs <= 5000 && getAudioMode) playBeep();
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 750);
    }
    if (tasks.length === 0) {
      setPause(true);
      setTimeMs(0);
      setDuration(0);
    }
    if (timeMs === 0 && tasks.length !== 0) {
      if (getConfig.intervalsEnabled && !intervalPeriod) {
        setTimeMs(getConfig.intervalDuration * 1000);
        setDuration(getConfig.intervalDuration * 1000);
        setAnimate(true);
        setInintervalPeriod(true);
      } else {
        setInintervalPeriod(false);
        setActiveIndex((i) => (tasks[i + 1] != undefined ? i + 1 : 0));
        setAnimate(false);
      }
    }
  }, [timeMs]);
  useEffect(() => {
    setTimeMs(tasks[activeIndex].duration * 1000);
    setDuration(tasks[activeIndex].duration * 1000);
    setAnimate(true);
  }, [activeIndex]);

  return (
    <>
      <style>
        {`
      @keyframes pulse {
          0% {
            box-shadow: 0 0 1px 0 rgb(${hex2rgb(theme.palette.main)} 0.7);
          }
          70% {
              box-shadow: 0 0 1px 45px rgba(${hex2rgb(theme.palette.main)} 0);
          }
          100% {
              box-shadow: 0 0 1px 0 rgba(${hex2rgb(theme.palette.main)} 0);
          }
        }
        `}
      </style>
      {/* <Button onClick={() => setAnimate(!animate)}>click</Button> */}
      <Typography
        variant='h4'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          my: '2rem',
        }}
      >
        <Typography variant='body1'>
          {intervalPeriod ? 'Interval Period' : 'Currently ongoing'}
        </Typography>
        {tasks[activeIndex].name}
      </Typography>
      <div className='section-container' style={{ pointerEvents: 'none' }}>
        {/* <TimerV2
          time={Math.floor(timeMs)}
          progress={(timeMs / duration) * 100}
        />  */}
        <div style={{ size: '200px' }}>
          <CircularProgressbarWithChildren
            counterClockwise={true}
            styles={{
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color
                stroke: currentColor,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'round',
                strokeWidth: '3.5px',
                // Customize transition animation
                transition: 'stroke-dashoffset 0.15s ease 0s',
                // Rotate the path
                transformOrigin: 'center center',
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                strokeWidth: '0.75px',
                stroke: currentColor,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
              },
              // Customize the text
              text: {
                // Text color
                //fill: '#f88',
                // Text size
                //fontSize: '16px',
              },
              // Customize background - only used when the `background` prop is true
              background: {},
            }}
            value={(timeMs / duration) * 100}
          >
            <Timestamp mseconds={timeMs} />
          </CircularProgressbarWithChildren>
        </div>
        <div className={animate ? 'pulse-animation' : ''}></div>
      </div>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          color: currentColor,
        }}
      >
        <IconButton onClick={() => goBack()} sx={{ color: theme.palette.main }}>
          <SkipPreviousRounded
            sx={{
              fontSize: '3rem',
              transition: '0.2s',
              ':hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => setPause(() => !isPaused)}
          sx={{ color: theme.palette.main }}
        >
          {isPaused ? (
            <PlayCircleFilledRounded
              sx={{
                fontSize: '5rem',
                transition: '0.2s',
                ':hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          ) : (
            <PauseCircleFilledRounded
              sx={{
                fontSize: '5rem',
                transition: '0.2s',
                ':hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          )}
        </IconButton>

        <IconButton onClick={() => goNext()} sx={{ color: theme.palette.main }}>
          <SkipNextRounded
            sx={{
              fontSize: '3rem',
              transition: '0.2s',
              ':hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </IconButton>
      </Box>
    </>
  );
};

export default Timesection;

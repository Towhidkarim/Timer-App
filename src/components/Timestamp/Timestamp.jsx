import React, { useContext } from 'react';
import { deepPurple } from '@mui/material/colors';
import AppTheme from '../Theme/AppTheme';
import { Typography } from '@mui/material';

const Timestamp = ({ mseconds }) => {
  const THEME = useContext(AppTheme);
  const minutes = Math.floor(mseconds / 1000 / 60);
  const secs = Math.floor(mseconds / 1000) % 60;
  return (
    <div
      style={{
        color: THEME.palette.main,
        userSelect: 'none',
        display: 'flex',
        direction: 'row',
      }}
    >
      <Typography
        sx={{
          fontSize: '3.5rem',
          fontFamily: 'roboto',
          fontWeight: 300,
        }}
      >
        {`${minutes < 10 ? '0' + minutes : minutes}:${
          secs < 10 ? '0' + secs : secs
        }`}
      </Typography>
      <div
        style={{
          fontSize: '1.25rem',
        }}
      >
        {(mseconds / 10) % 100 < 10
          ? '0' + ((mseconds / 10) % 100)
          : (mseconds / 10) % 100}
      </div>
    </div>
  );
};

export default Timestamp;

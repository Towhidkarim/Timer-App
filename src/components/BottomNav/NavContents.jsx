import { IconButton, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import {
  ColorLens,
  EditRounded,
  PauseCircleFilledRounded,
} from '@mui/icons-material';
import AppTheme from '../Theme/AppTheme';

const NavContents = () => {
  const theme = useContext(AppTheme);
  const hoverStyle = {
    padding: '5px',
    fontSize: '175%',
    color: 'white',
    transition: '.25s',
    ':hover': {
      //size: '150%',
      transform: 'scale(1.15)',
    },
  };

  return (
    <>
      <Stack
        direction='row'
        justifyContent='space-around'
        alignItems='center'
        sx={{
          height: '100%',
        }}
      >
        <Stack alignItems='center' columnGap={0}>
          <IconButton sx={{ color: theme.palette.secondary }}>
            <EditRounded fontSize='large' sx={hoverStyle} />
          </IconButton>
          <Typography fontSize='1rem'>Edit</Typography>
        </Stack>
        <IconButton sx={{ color: theme.palette.secondary }}>
          <PauseCircleFilledRounded fontSize='large' sx={hoverStyle} />
        </IconButton>
        <IconButton sx={{ color: theme.palette.secondary }}>
          <ColorLens fontSize='large' sx={hoverStyle} />
        </IconButton>
      </Stack>
    </>
  );
};

export default NavContents;

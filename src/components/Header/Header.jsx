import React, { useContext, useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import './Header.scss';
import { Container } from '@mui/system';
import { deepPurple } from '@mui/material/colors';
import AppTheme from '../Theme/AppTheme';
import { MenuRounded, Settings } from '@mui/icons-material';
import RightBarContents from '../SideDrawer/RightBarContents';
//import ThemeDefault from '../Theme/ThemeDeafault';

const Header = (props) => {
  const HEADER_HEIGHT = 60;
  const theme = useContext(AppTheme);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position='fixed'
        sx={{
          ...props.styles,
          padding: '0px',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // backgroundColor: 'rgba(138, 170, 229, 1)',
          backgroundColor: theme.palette.main,
          height: `${HEADER_HEIGHT}px`,
          boxShadow: '0 2px 10px -2px rgba(0, 0, 0, 0.2)',
          // borderBottom: '1px solid rgba(0, 0, 255, 0.15)',
        }}
      >
        <>
          <Box
            component='div'
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mx: 2,
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              component='div'
            >
              {props.children}
              <Typography variant='h4'>Timer</Typography>
            </Box>
            <Box sx={{}} component='div'>
              <IconButton
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Settings sx={{ color: 'white' }} fontSize='large' />
              </IconButton>
            </Box>
          </Box>
        </>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            disableRipple
            sx={{ ':hover': { background: 'none' }, pb: 0 }}
          >
            <RightBarContents mobileMode={true} />
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Header;

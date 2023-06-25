import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Timesection from '../Timesection/Timesection';
import Header from '../Header/Header';
import { CloseRounded, MenuRounded } from '@mui/icons-material';
import BottomNav from '../BottomNav/BottomNav';
import TaskData from '../../Utils/TaskData';
import Drawercontents from './Drawercontents';
import { SwipeableDrawer } from '@mui/material';
import RightBarContents from './RightBarContents';

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const taskData = useContext(TaskData);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        styles={
          {
            // width: { sm: `calc(100% - ${drawerWidth}px)` },
            // ml: { sm: `${drawerWidth}px` },
          }
        }
      >
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuRounded sx={{ fontSize: '2rem' }} />
        </IconButton>
      </Header>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <SwipeableDrawer
          anchor='left'
          variant='temporary'
          open={mobileOpen}
          onOpen={() => setMobileOpen(true)}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}
          >
            <IconButton sx={{ p: 2 }} onClick={handleDrawerToggle}>
              <CloseRounded fontSize='large' />
            </IconButton>
          </Box>
          <Drawercontents />
        </SwipeableDrawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: { lg: drawerWidth + 40, sm: drawerWidth },
            },
          }}
          open
        >
          <Toolbar />
          <Drawercontents />
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          maxWidth: { md: `calc(100% - ${2 * drawerWidth}px)` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
      <Box>
        <Drawer
          variant='permanent'
          anchor='right'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          <RightBarContents />
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;

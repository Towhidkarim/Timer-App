import React, { useState } from 'react';
import { Drawer, Toolbar } from '@mui/material';
import Drawercontents from './Drawercontents';
import { Box } from '@mui/system';

const SlideDrawer = ({ open }) => {
  const [isOpen, setIsOpen] = useState(false);
  const DRAWER_WIDTH = 450;
  const handleOpenState = () => setIsOpen((value) => !value);

  return (
    <>
      <Drawer
        open={open || false}
        ModalProps={{
          hideBackdrop: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: 'white',
            maxWidth: '80%',
          },
        }}
        PaperProps={{
          sx: {
            //filter: 'blur(2px)',
            opacity: '.95',
          },
        }}
      >
        <Box
          sx={{
            height: '100%',
            //filter: 'blur(5px)',
          }}
        >
          <Toolbar />
          <Drawercontents />
        </Box>
      </Drawer>
    </>
  );
};

export default SlideDrawer;

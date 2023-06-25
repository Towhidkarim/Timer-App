import { MenuOpenRounded } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import AppTheme from '../Theme/AppTheme';

const SideDrawer = ({ state, drawerHandler }) => {
  const [isOpen, setIsOpen] = useState(state);
  const theme = useContext(AppTheme);

  return (
    <>
      <Drawer
        variant='persistent'
        open={state}
        PaperProps={{
          sx: {
            // height: 'calc(100vh - 60px)',
            top: 'auto',
            width: '275px',
            minWidth: '25vw',
            maxWidth: '80vw',
            bottom: 0,
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
          },
        }}
      >
        <Box>
          <IconButton
            onClick={drawerHandler}
            sx={{
              color: theme.font.color.main,
            }}
          >
            <MenuOpenRounded fontSize='large' />
          </IconButton>
        </Box>
        <List>
          {['Option A', 'Option B', 'Option C'].map((value, i) => (
            <ListItem
              key={i}
              sx={{
                color: theme.font.color.main,
                textAlign: 'center',
              }}
            >
              <Typography variant='h6'>{value}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideDrawer;

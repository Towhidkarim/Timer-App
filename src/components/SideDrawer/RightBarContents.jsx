import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Slider,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { Children, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../../Utils/useLocalStorage';
import { TimeConfig } from '../../Utils/GlobalConfig';
import {
  AccessTime,
  AvTimer,
  Code,
  Facebook,
  GitHub,
  Info,
  Timelapse,
  VolumeUp,
} from '@mui/icons-material';

const RightBarContents = ({ mobileMode }) => {
  const listButtonStyle = {
    borderRadius: 2,
    m: 0.5,
    transition: '0.25s ease',
    ':active': { opacity: 0.75 },
  };

  const listTextStyle = {
    fontSize: '1.25rem',
    fontWeight: 'low',
    letterSpacing: 0,
  };

  const iconStyle = {
    fontSize: '175%',
    mr: 2,
    color: 'grey',
  };
  const { getConfig, setConfig, getAudioMode, setAudioMode } =
    useContext(TimeConfig);
  const [intervalMode, setIntervalMode] = useState(getConfig.intervalsEnabled);

  const changeIntervalMode = () => {
    setIntervalMode(!intervalMode);
    setConfig({ ...getConfig, intervalsEnabled: !getConfig.intervalsEnabled });
  };

  const [intervalDuration, setIntervalDuration] = useState(
    getConfig.intervalDuration
  );
  const changeIntervalDuration = (event) => {
    setConfig({ ...getConfig, intervalDuration: intervalDuration });
  };
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {mobileMode ? '' : <Toolbar />}
      <Box sx={{ m: 1 }}>
        <List>
          {mobileMode ? '' : <Divider />}

          <ListItemButton
            disableRipple
            onClick={changeIntervalMode}
            sx={listButtonStyle}
          >
            <AccessTime sx={iconStyle} />

            <ListItemText
              primary='Intervals '
              primaryTypographyProps={listTextStyle}
            />
            <Switch checked={intervalMode} edge='end' />
          </ListItemButton>
          {/* <ListItemButton sx={listButtonStyle} disableRipple>
            <ListItemText
              primary='Set Interval'
              primaryTypographyProps={listTextStyle}
            />
          </ListItemButton> */}
          <ListItem>
            <Stack sx={{ width: '100%', ml: 0.5 }}>
              <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
              >
                <Timelapse sx={iconStyle} />
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: '1.25rem',
                    color: !intervalMode && 'grey',
                  }}
                  primary='Interval Duration'
                />
              </Stack>
              <Slider
                sx={{ width: '100%' }}
                value={intervalDuration}
                disabled={!intervalMode}
                min={5}
                max={60}
                marks
                valueLabelDisplay='auto'
                step={5}
                onChange={(event) => setIntervalDuration(event.target.value)}
                onChangeCommitted={changeIntervalDuration}
              />
            </Stack>
          </ListItem>
          <ListItemButton
            disableRipple
            onClick={() => setAudioMode(!getAudioMode)}
            sx={listButtonStyle}
          >
            <VolumeUp sx={iconStyle} />

            <ListItemText
              primary='Enable Audio'
              primaryTypographyProps={listTextStyle}
            />
            <Switch checked={getAudioMode} edge='end' />
          </ListItemButton>
          <ListItemButton
            sx={listButtonStyle}
            onClick={() => setModalOpen(true)}
          >
            <Info sx={iconStyle} />
            <ListItemText
              primary='About'
              primaryTypographyProps={listTextStyle}
            />
          </ListItemButton>
          {mobileMode ? '' : <Divider />}
        </List>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: '1rem',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant='h5'>About</Typography>
            <Typography variant='body'>
              A hobby project which may be useful to some people. To know more,
              you may visit:
            </Typography>
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              columnGap={2}
              sx={{ m: 2 }}
            >
              <IconButton
                onClick={() => window.open('https://github.com/Towhidkarim/')}
              >
                <GitHub fontSize='large' />
              </IconButton>
              <IconButton
                onClick={() =>
                  window.open('https://facebook.com/towhid.karim.1')
                }
              >
                <Facebook fontSize='large' />
              </IconButton>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default RightBarContents;

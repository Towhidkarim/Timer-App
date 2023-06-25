import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slider,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { Children, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../../Utils/useLocalStorage';
import { TimeConfig } from '../../Utils/GlobalConfig';
import { AccessTime, AvTimer, Timelapse, VolumeUp } from '@mui/icons-material';

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

  return (
    <div>
      {mobileMode ? '' : <Toolbar />}
      <Box sx={{ m: 1 }}>
        <List>
          <Divider />
          <ListItemButton
            disableRipple
            onClick={changeIntervalMode}
            sx={listButtonStyle}
          >
            <AccessTime sx={iconStyle} />

            <ListItemText
              primary='Delay timer'
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
                  primary='Interval'
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
          <Divider />
        </List>
      </Box>
    </div>
  );
};

export default RightBarContents;

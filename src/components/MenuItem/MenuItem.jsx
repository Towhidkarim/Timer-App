import {
  CancelOutlined,
  Delete,
  DeleteOutlineOutlined,
  DoneOutlineRounded,
  ModeEdit,
  ModeEditOutlineOutlined,
  ModeEditRounded,
} from '@mui/icons-material';
import {
  Box,
  Stack,
  Fade,
  Grow,
  IconButton,
  ListItemButton,
  Select,
  Slider,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import AppTheme from '../Theme/AppTheme';

const MenuItem = ({ task, index, editFunction, deleteFunction, isActive }) => {
  const [editMode, setEditMode] = useState(false);
  const theme = useContext(AppTheme);
  const [textFieldValue, setTextFieldValue] = useState(task.name);
  const [timeValue, setTimeValue] = useState(task.duration);
  const [isHovering, setIsHovering] = useState(false);

  const handleValueChange = () => {
    if (textFieldValue === '') setEditMode(!editMode);
    else {
      editFunction(textFieldValue, index, timeValue);
      setEditMode(!editMode);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleValueChange();
    }
  };

  return (
    <>
      <Fade in={!editMode}>
        <Stack
          sx={{
            display: !editMode ? 'flex' : 'none',
            borderRadius: '0.75rem',
            transition: 'background 1s',
            mb: '0.1rem',
            backgroundColor: isActive ? theme.palette.main : 'none',
            color: isActive ? theme.palette.secondary : 'black',

            '&:hover': {
              backgroundColor: isActive
                ? theme.palette.main
                : theme.palette.hoverColor,
            },
          }}
          justifyContent='space-between'
          alignItems='center'
          direction='row'
          width='100%'
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <ListItemButton
            disableRipple
            sx={{
              borderRadius: '.75rem',
              width: '80%',
              '&:hover': { backgroundColor: 'transparent' },
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '1.125rem',
                py: '2.5px',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              {task.name}
            </Typography>
          </ListItemButton>
          <IconButton onClick={() => setEditMode(!editMode)}>
            {isActive ? (
              <ModeEdit sx={{ color: theme.palette.secondary }} />
            ) : (
              <ModeEditOutlineOutlined />
            )}
          </IconButton>

          <IconButton onClick={() => deleteFunction(index)} disabled={isActive}>
            {isActive ? (
              <Delete sx={{ color: theme.palette.secondary }} />
            ) : (
              <DeleteOutlineOutlined />
            )}
          </IconButton>
        </Stack>
      </Fade>
      <Grow in={editMode}>
        <Stack
          sx={{ ml: '1rem', display: editMode ? 'flex' : 'none' }}
          justifyContent='space-between'
          alignItems='center'
          direction='column'
          width='100%'
        >
          <Stack
            sx={{}}
            justifyContent='space-between'
            alignItems='center'
            direction='row'
          >
            <TextField
              variant='standard'
              label=' '
              defaultValue={task.name}
              placeholder={task.name}
              fontSize='1.125rem'
              onChange={(event) => setTextFieldValue(event.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                fontWeight: 500,
                fontSize: '1.125rem',
                mx: 'auto',
                width: '70%',
              }}
            />
            <IconButton onClick={handleValueChange}>
              <DoneOutlineRounded />
            </IconButton>
            <IconButton onClick={() => setEditMode(!editMode)}>
              <CancelOutlined />
            </IconButton>
          </Stack>
          <Stack
            spacing={2}
            direction='row'
            sx={{ mb: 1, width: '100%' }}
            alignItems='center'
            justifyContent='space-between'
          >
            <Slider
              value={timeValue}
              step={5}
              marks
              min={5}
              max={60}
              valueLabelDisplay='auto'
              onChange={(event) => setTimeValue(event.target.value)}
              sx={{ my: '1rem', width: '70%' }}
            />
            <Typography variant='body' sx={{ pr: '10%' }}>
              {timeValue}
            </Typography>
          </Stack>
        </Stack>
      </Grow>
    </>
  );
};

export default MenuItem;

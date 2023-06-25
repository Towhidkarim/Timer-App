import { Global } from '@emotion/react';
import {
  AddCircleOutlineOutlined,
  AddOutlined,
  CancelOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import Task from '../../Utils/Task';
import TaskData from '../../Utils/TaskData';
import MenuItem from '../MenuItem/MenuItem';

const Drawercontents = () => {
  const taskData = useContext(TaskData);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');

  const handleTaskChange = (taskName, index, dur) => {
    taskData.setTasks(
      taskData.tasks.map((v, i) => {
        if (i === index) return { name: taskName, duration: dur };
        else return v;
      })
    );
  };
  const addTask = () => {
    if (newName !== '' && newName !== ' ')
      taskData.setTasks([...taskData.tasks, { name: newName, duration: 20 }]);
    setIsAdding(!isAdding);
    setNewName('');
  };

  const deleteTask = (index) => {
    if (index < taskData.activeIndex) {
      taskData.setActiveIndex((i) => i - 1);
    }
    taskData.setTasks(taskData.tasks.filter((v, i) => i != index));
  };
  const handleTaskName = (evnet) => setNewName(evnet.target.value);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleTaskName(event);
      addTask();
    }
  };

  return (
    <>
      <Box sx={{ m: 1 }}>
        {taskData.tasks.map((value, i) => (
          <ListItem key={i} sx={{ width: '100%' }} disablePadding>
            <MenuItem
              task={value}
              index={i}
              isActive={taskData.activeIndex === i ? true : false}
              editFunction={handleTaskChange}
              deleteFunction={deleteTask}
            />
          </ListItem>
        ))}
      </Box>

      <Divider sx={{ mt: 1 }} />
      <ListItem sx={{ width: '80%', mx: 'auto', mt: 1 }} disablePadding>
        <ListItemButton
          sx={{ borderRadius: '1rem', display: !isAdding ? 'flex' : 'none' }}
          onClick={() => setIsAdding(!isAdding)}
        >
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            sx={{ mx: 'auto' }}
          >
            <AddOutlined sx={{ m: 'auto' }} fontSize='large' aria-label='Add' />
            <Typography variant='button'> Add Task</Typography>
          </Stack>
        </ListItemButton>

        {isAdding ? (
          <Box>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              sx={{ mx: 'auto', width: '100%' }}
            >
              <TextField
                variant='outlined'
                onChange={handleTaskName}
                onKeyDown={handleKeyDown}
                label='Task Name'
              />
              <Stack direction='row'>
                <IconButton onClick={addTask}>
                  <AddOutlined />
                </IconButton>
                <IconButton onClick={() => setIsAdding(!isAdding)}>
                  <CancelOutlined />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        ) : (
          ''
        )}
      </ListItem>
    </>
  );
};

export default Drawercontents;

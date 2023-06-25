import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';

const TaskAppender = ({ appendTask, visible }) => {
  const [taskName, setTaskName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (event) => setTaskName(event.target.value);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleChange(event);
    }
  };

  return (
    <>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        width='100%'
      >
        <TextField
          variant='standard'
          label='Task Name'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Stack>
    </>
  );
};

export default TaskAppender;

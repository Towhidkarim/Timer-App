import { useState, useEffect, createContext } from 'react';
import Timer from './components/Timer';
import TimerV2 from './components/TimerV2/TimerV2';
import './App.scss';
import Timesection from './components/Timesection/Timesection';
import Header from './components/Header/Header';
import SideDrawer from './components/SideDrawer/SideDrawer';
import { Box } from '@mui/system';
import ResponsiveDrawer from './components/SideDrawer/ResponsiveDrawer';
import SlideDrawer from './components/SideDrawer/SlideDrawer';
import { CssBaseline, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import AppTheme from './components/Theme/AppTheme';
import ThemeProvider from './components/Theme/ThemeProvider';
import BottomNav from './components/BottomNav/BottomNav';
import Task from './Utils/Task';
import TaskData from './Utils/TaskData';
import { TimeConfig, appConfig } from './Utils/GlobalConfig';
import useLocalStorage from './Utils/useLocalStorage';

function App() {
  const [currentTheme, setCurrentTheme] = useState(ThemeProvider.default);
  const changeTheme = (theme) => {
    setCurrentTheme(theme);
  };
  const [drawerIsOpen, setDrawerIsOpen] = useState(
    useMediaQuery(useTheme().breakpoints.up('lg'))
  );
  const handleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (i) => {
    setActiveIndex((v) => i);
  };
  const defaultTasks = [
    { name: 'Demo 1', duration: 20 },
    { name: 'Demo 2', duration: 20 },
  ];

  const [getSaveData, setSaveData] = useLocalStorage('appTaskList', null);
  const [getConfig, setConfig] = useLocalStorage('config', appConfig);
  const [getAudioMode, setAudioMode] = useLocalStorage('audio', true);
  if (getConfig === null) setConfig(appConfig);
  const [tasks, setTasks] = useState(
    getSaveData === null ? defaultTasks : getSaveData
  );
  useEffect(() => {
    setSaveData(tasks);
  }, [tasks]);

  return (
    <div className='App'>
      <TimeConfig.Provider
        value={{
          setActiveIndex,
          activeIndex,
          tasks,
          getConfig,
          setConfig,
          getAudioMode,
          setAudioMode,
        }}
      >
        <TaskData.Provider
          value={{
            tasks,
            setTasks,
            updateIndex,
            activeIndex,
            setActiveIndex,
          }}
        >
          <AppTheme.Provider value={currentTheme}>
            <CssBaseline />
            <div className='body'>
              <ResponsiveDrawer>
                <Timesection />
                {/* <BottomNav /> */}
              </ResponsiveDrawer>
              <Toolbar />
            </div>
          </AppTheme.Provider>
        </TaskData.Provider>
      </TimeConfig.Provider>
    </div>
  );
}

export default App;

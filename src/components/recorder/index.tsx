import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { startAction, stopAction } from 'redux/actions/recorder';
import { getStartDate } from 'redux/reducers/recorder';
import getCountValue from 'utils/getCountValue';
import { createEvent } from 'redux/actions/events';

const Recorder = () => {
  const dateStart = useSelector(getStartDate);
  const dispatch = useDispatch();

  const [, setCount] = useState(0);

  const interval = useRef<number>(0);


  useEffect(() => () => {
    window.clearInterval(interval.current);
  }, []);

  const handleClick = () => {
    if (dateStart) {
      dispatch(createEvent());
      dispatch(stopAction());
      window.clearInterval(interval.current);
      return;
    }
    dispatch(startAction());
    interval.current = window.setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  };

  return (
    <div className={dateStart ? 'recorder recorder-started' : 'recorder'}>
      <button className='recorder-button' onClick={handleClick}><span></span></button>
      <div className='recorder-counter'><span>{dateStart ? getCountValue(dateStart) : '00:00:00'}</span></div>
    </div>
  );
};


export default Recorder;

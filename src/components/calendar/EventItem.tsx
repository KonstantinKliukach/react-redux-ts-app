import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './index.css';

import { UserEvent } from 'redux/reducers/userEvents';
import { addZero } from 'utils/getCountValue';
import { deleteEvent, updateEvent } from 'redux/actions/events';

function getTimeInterval(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${addZero(startDate.getHours())}-${addZero(startDate.getMinutes())} : ${addZero(endDate.getHours())}-${addZero(endDate.getMinutes())}`;
}

interface EvenItem {
  event: UserEvent;
}


const EvenItem: React.FC<EvenItem> = ({ event }) => {
  const [isEditable, setIsEditable] = useState(false);

  const [title, setTitle] = useState(event.title);

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: UserEvent['id']): void => {
    dispatch(deleteEvent(id));
  };

  const handleTitleClick = (): void => {
    setIsEditable(true);
  };

  const handleBlur = (): void => {
    if (title !== event.title) {
      dispatch(updateEvent({
        ...event,
        title,
      }));
    }
    setIsEditable(false);
  };

  const handleChande = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (isEditable) {
      // eslint-disable-next-line no-unused-expressions
      inputRef.current?.focus();
    }
  }, [isEditable]);

  return (
    <div className='calendar-event'>
      <div className='calendar-event-info'>
        <div className='calendar-event-time'>
          {getTimeInterval(event.dateStart, event.dateEnd)}
        </div>
        <div className='calendar-event-title'>
          {
            isEditable
              ? <input onBlur={handleBlur} onChange={handleChande} ref={inputRef} value={title} type='text' />
              : <span onClick={handleTitleClick}>{title}</span>
          }
        </div>
      </div>
      <button className='calendar-event-delete-button' onClick={(): void => handleDelete(event.id)}>&times;</button>
    </div>
  );
};

export default EvenItem;

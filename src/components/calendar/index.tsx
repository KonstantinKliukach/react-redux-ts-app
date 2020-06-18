import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';
import { RootState } from 'redux/store';
import { loadEvents, deleteEvent } from 'redux/actions/events';
import { UserEvent } from 'redux/reducers/userEvents';
import { addZero } from 'utils/getCountValue';

function getKeyFromDate(date: string): string {
  return date.slice(0, 10);
}

// eslint-disable-next-line no-undef
function groupEventsByDay(events: UserEvent[]): Record<string, UserEvent[]> {
  // eslint-disable-next-line no-undef
  const days: Record<string, UserEvent[]> = {};

  const addToGroup = (key: string, event: UserEvent): void => {
    if (!days[key]) {
      days[key] = [];
    }
    days[key].push(event);
  };

  for (let i = 0; i < events.length; i += 1) {
    const startKey = getKeyFromDate(events[i].dateStart);
    const endKey = getKeyFromDate(events[i].dateEnd);
    addToGroup(startKey, events[i]);
    if (startKey !== endKey) {
      addToGroup(endKey, events[i]);
    }
  }
  return days;
}

function getTimeInterval(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${addZero(startDate.getHours())}-${addZero(startDate.getMinutes())} : ${addZero(endDate.getHours())}-${addZero(endDate.getMinutes())}`;
}


const Calendar: React.FC = () => {
  const events = useSelector((state: RootState) => state.userEvents.allIds
    .map((id) => state.userEvents.byIds[id]));

  const dispatch = useDispatch();

  const handleDelete = (id: UserEvent['id']): void => {
    dispatch(deleteEvent(id));
  };

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  // eslint-disable-next-line no-undef
  let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;
  let sortedGroupKeys: string[] | undefined;

  if (events.length) {
    groupedEvents = groupEventsByDay(events);
    sortedGroupKeys = Object.keys(groupedEvents).sort(
      (date1, date2) => +new Date(date2) - +new Date(date1)
    );
  }

  return groupedEvents && sortedGroupKeys ? (
    <div className='calendar'>
      {
        sortedGroupKeys.map((day) => {
          const date = new Date(day);
          return (
            <div className='calendar-day' key={day}>
              <div className='calendar-day-label'>
                <span>{`${date.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}`}</span>
              </div>
              <div className='calendar-events'>
                {
                  groupedEvents![day].map((event) => (
                    <div className='calendar-event' key={event.id}>
                      <div className='calendar-event-info'>
                        <div className='calendar-event-time'>
                          {}
                          {getTimeInterval(event.dateStart, event.dateEnd)}
                        </div>
                        <div className='calendar-event-title'>
                          {event.title}
                        </div>
                      </div>
                      <button className='calendar-event-delete-button' onClick={(): void => handleDelete(event.id)}>&times;</button>
                    </div>
                  ))
                }
              </div>
            </div>
          );
        })
      }
    </div>
  ) : <p>Loading...</p>;
};

export default Calendar;

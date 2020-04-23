import React from 'react';

import './index.css';

const Calendar: React.FC = () => (
    <div className='calendar'>
      <div className='calendar-day'>
        <div className='calendar-day-label'>
          <span>23 March</span>
        </div>
        <div className='calendar-events'>
          <div className='calendar-event'>
            <div className='calendar-event-info'>
              <div className='calendar-event-time'>
                10:00 - 12:00
              </div>
              <div className='calendar-event-title'>
                Making test task
              </div>
            </div>
            <button className='calendar-event-delete-button'>&times;</button>
          </div>
        </div>
      </div>
    </div>
);

export default Calendar;

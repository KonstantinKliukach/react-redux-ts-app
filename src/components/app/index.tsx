import React from 'react';
import './App.css';
import Calendar from 'components/calendar';
import Recorder from 'components/recorder';

const App: React.FC = () => (
    <div className="App">
      <Recorder />
      <Calendar />
    </div>
);


export default App;

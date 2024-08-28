import React from 'react'
import './Content3.css'
import { useState } from 'react';

export default function Content3() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date(); // Get today's date

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const weeks = [];
    let dayCounter = 1;

    for (let week = 0; week < 6; week++) {
      const days = [];

      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < firstDayOfMonth.getDay()) || dayCounter > daysInMonth) {
          days.push(<td key={`empty-${week}-${day}`} />);
        } else {
          const currentDateToCompare = new Date(year, month, dayCounter);
          days.push(
            <td key={`day-${week}-${day}`}>
              <div
                className={`calendar-day ${currentDateToCompare.toDateString() === today.toDateString() ? 'currentDay' : ''}`}
              >
                {dayCounter}
              </div>
            </td>
          );
          dayCounter++;
        }
      }

      weeks.push(<tr key={`week-${week}`}>{days}</tr>);
    }

    return weeks;
  };


  return (
    <div className='con3' style={{ gridArea: 'con3', marginTop: '10px' }}>
      <div className="calendar-container">
        <div className='calendarHeader'>
          <h4>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
          <div className="calHeadBtn">
            <button className='calBtn' onClick={handlePrevMonth}><p>&lt;</p></button>
            <button className='calBtn' onClick={handleNextMonth}><p>&gt;</p></button>
          </div>
        </div>
        <table className='calendar'>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>
      </div>
    </div>
  )
}

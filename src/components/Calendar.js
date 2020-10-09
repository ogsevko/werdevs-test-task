/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { CalendarWeek } from './CalendarWeek';
import { dayNames, monthNames } from '../data/Data';
import { v4 as uuidv4 } from 'uuid';

export const Calendar = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(null);
  const [weeks, setWeeks] = useState([]);

  // componentDidMount
  useEffect(() => {
    const fullDate = new Date();

    setMonth(fullDate.getMonth());
    setYear(fullDate.getFullYear());

    const calendarWeeks
      = getDayNumbers(fullDate.getMonth(), fullDate.getFullYear());

    setWeeks(calendarWeeks);
  }, []);

  // componentDidUpdate
  useEffect(() => {
    const calendarWeeks = getDayNumbers(month, year);

    setWeeks(calendarWeeks);
  }, [month, year]);

  // Function for generating sequence of numbers for days in the calendar
  function getDayNumbers(newMonth, newYear) {
    const nDaysPrevMonth = new Date(newYear, newMonth, 0).getDate();
    const nDaysCurrentMonth = new Date(newYear, newMonth + 1, 0).getDate();
    const firstDayCurrentMonth = new Date(newYear, newMonth, 1).getDay();
    const lastDayCurrentMonth
      = new Date(newYear, newMonth, nDaysCurrentMonth).getDay();

    const dayNumbers = [];
    const dayNumbersByWeeks = [];

    let newId = '';
    let i = nDaysPrevMonth - firstDayCurrentMonth + 1;

    if (firstDayCurrentMonth !== 0) {
      for (i; i <= nDaysPrevMonth; i++) {
        newId = uuidv4();

        dayNumbers.push({
          number: i.toString(),
          class: 'dim',
          id: newId,
        });
      }
    }

    for (i = 1; i <= nDaysCurrentMonth; i++) {
      newId = uuidv4();

      dayNumbers.push({
        number: i < 10 ? `0${i}` : i.toString(),
        class: 'bright',
        id: newId,
      });
    }

    if (lastDayCurrentMonth < 6) {
      for (i = 1; i <= 6 - lastDayCurrentMonth; i++) {
        newId = uuidv4();

        dayNumbers.push({
          number: i < 10 ? `0${i}` : i.toString(),
          class: 'dim',
          id: newId,
        });
      }
    }

    let week = [];

    for (i = 0; i < dayNumbers.length; i++) {
      week.push(dayNumbers[i]);

      if (week.length === 7) {
        dayNumbersByWeeks.push(week);

        week = [];
      }
    }

    return dayNumbersByWeeks;
  }

  // Click handler for month swiping
  const changeMonth = (event) => {
    let newMonth;
    let newYear = year;

    if (event.target.id === 'arrow-left') {
      if (month === 0) {
        newMonth = 11;
        newYear = year - 1;
      } else {
        newMonth = month - 1;
      }
    } else if (event.target.id === 'arrow-right') {
      if (month === 11) {
        newMonth = 0;
        newYear = year + 1;
      } else {
        newMonth = month + 1;
      }
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  // JSX
  return (
    <div className="calendar">
      <div className="calendar__header">
        <img
          src={process.env.PUBLIC_URL + 'arrow-left.svg'}
          id="arrow-left"
          alt="Click on this arrow to move one month back"
          className="calendar__arrow"
          onClick={(e) => changeMonth(e)}
        />
        <h2 className = "calendar__date">
          {`${monthNames[month]} ${year}`}
        </h2>
        <img
          src={process.env.PUBLIC_URL + 'arrow-right.svg'}
          id="arrow-right"
          alt="Click on this arrow to move one month ahead"
          className="calendar__arrow"
          onClick={(e) => changeMonth(e)}
        />
      </div>

      <div className="calendar__month">
        {weeks.map((week, index) => (
          <CalendarWeek
            week={week}
            key={index}
          />
        ))}
      </div>

      <div className="calendar__footer">
        {dayNames.map((dayName) => (
          <div className="calendar__day calendar__day-bright">
            <span className="calendar__day-name">
              {dayName[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

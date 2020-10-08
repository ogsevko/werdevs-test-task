import React, {useState, useEffect } from 'react';
import { CalendarWeek } from './CalendarWeek';
import { dayNames, monthNames } from '../data/Data';
import { v4 as uuidv4 } from 'uuid';

export const Calendar = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const fullDate = new Date();

    setMonth(monthNames[fullDate.getMonth()]);
    setYear(fullDate.getFullYear());

    const calendarWeeks =
      getDayNumbers(fullDate.getMonth(), fullDate.getFullYear());

    setWeeks(calendarWeeks);
  }, []);

  function getDayNumbers(month, year) {
    const nDaysPrevMonth = new Date(year, month, 0).getDate();
    const nDaysCurrentMonth = new Date(year, month + 1, 0).getDate();
    const firstDayCurrentMonth = new Date(year, month, 1).getDay();
    const lastDayCurrentMonth =
      new Date(year, month, nDaysCurrentMonth).getDay();

    const dayNumbers = [];
    const dayNumbersByWeeks = [];

    let newId = '';
    let i = nDaysPrevMonth - firstDayCurrentMonth - 1;

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


  return (
    <div className="calendar">
      <div className="calendar__header">
        <img
          src={process.env.PUBLIC_URL + 'arrow-left.svg'}
          alt="Click on this arrow to move one month back"
          className="calendar__arrow"
        />
        <h2 className = "calendar__month">
          {`${month} ${year}`}
        </h2>
        <img
          src={process.env.PUBLIC_URL + 'arrow-left.svg'}
          alt="Click on this arrow to move one month ahead"
          className="calendar__arrow"
        />
      </div>
      
      <table className="calendar__month">
        {weeks.map((week) => (
          <CalendarWeek week={week} />
        ))}

        <tr className="calendar__footer">
          {dayNames.map((dayName) => (
            <td className="calendar__day-name">
              {
                dayName[0]
              }
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
};

/* eslint-disable no-unused-vars */
import React from 'react';
import { dayNames } from '../data/Data';

const classNames = require('classnames');

export const CalendarWeek = ({ week }) => {
  return (
    <tr className="calendar__week">
      {week.map((day, index) => (
        <td
          className={
            classNames('calendar__day', `calenday__day-${day.class}`)
          }
          title={dayNames[index]}
          key={day.id}
        >
          {day.number}
        </td>
      ))}
    </tr>
  );
};

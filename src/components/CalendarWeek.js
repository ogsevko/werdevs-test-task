/* eslint-disable no-unused-vars */
import React from 'react';
import { dayNames } from '../data/Data';

const classNames = require('classnames');

export const CalendarWeek = ({ week }) => {
  return (
    <div className="calendar__week">
      {week.map((day, index) => (
        <div
          className={
            classNames(
              'calendar__day',
              `calendar__day-${day.class}`,
            )
          }
          title={dayNames[index]}
          key={day.id}
        >
          <span className="calendar__number">
            {day.number}
          </span>
        </div>
      ))}
    </div>
  );
};

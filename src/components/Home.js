/* eslint-disable no-unused-vars */
import React from 'react';
import { Calendar } from './Calendar';

export function Home() {
  return (
    <main className="home">
      <div className="home__content">
        <img
          src={process.env.PUBLIC_URL + 'home_image.jpg'}
          alt="A guy holding a cup of coffee"
          className="home__image"
        />

        <h1 className="home__title">
          Choose the day for the meeting
        </h1>
        <p className="home__text">
          We encourage you to book your <br/>
          appointment online. <br/>
          This will save you time.
        </p>
      </div>
      <div className="home__panel">
        <Calendar />
      </div>
    </main>
  );
};

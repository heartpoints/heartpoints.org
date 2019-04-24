import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment);

  const state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days").toDate()),
        title: "Some titlee"
      }
    ]
  };    

export const Calendar = () => <BigCalendar
    localizer={localizer}
    defaultDate={new Date()}
    defaultView="week"
    events={state.events}
/>
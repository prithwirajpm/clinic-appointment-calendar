import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Appointment Calendar</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="rounded-lg shadow"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            {selectedDate.toDateString()}
          </h3>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Add Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAppointments, deleteAppointment } from "../utils/storage";
import AppointmentModal from "./AppointmentModal";
import { handleDeleteConfirm } from "./handleDeleteConfirm";
import Navigation from "./Navigation";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [appointments, setAppointments] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");

  useEffect(() => {
    const stored = getAppointments();
    setAppointments(stored);
  }, []);

  const currentKey = selectedDate.toDateString();

  const filteredAppointments = (appointments[currentKey] || []).filter(
    (appt) => {
      const matchesDoctor = doctorFilter ? appt.doctor === doctorFilter : true;
      const matchesSearch = appt.patient
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesDoctor && matchesSearch;
    }
  );

  const handleDelete = (index) => {
    const updated = deleteAppointment(selectedDate, index);
    setAppointments(updated);
  };

  return (
    <div>
      <Navigation />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Appointment Calendar</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="rounded-lg shadow"
            onClickDay={(value) => {
              setSelectedDate(value);
              setOpenModal(true);
            }}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">
              {selectedDate.toDateString()}
            </h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search by patient"
                className="border p-2 rounded w-1/2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="border p-2 rounded w-1/2"
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
              >
                <option value="">All Doctors</option>
                {[
                  ...new Set(
                    Object.values(appointments)
                      .flat()
                      .map((a) => a.doctor)
                  ),
                ].map((doc, i) => (
                  <option key={i} value={doc}>
                    {doc}
                  </option>
                ))}
              </select>
            </div>

            <ul className="space-y-2">
              {filteredAppointments.map((appt, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded shadow">
                  <p>
                    <strong>Patient:</strong> {appt.patient}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {appt.doctor}
                  </p>
                  <p>
                    <strong>Time:</strong> {appt.time}
                  </p>
                  <p>
                    <strong>Status:</strong> {appt.status}
                  </p>
                  <p>
                    <strong>Token:</strong> {appt.token}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setEditIndex(index);
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteConfirm(index, handleDelete)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => {
                setEditIndex(null);
                setOpenModal(true);
              }}
            >
              Add Appointment
            </button>
          </div>
        </div>

        {openModal && (
          <AppointmentModal
            date={selectedDate}
            close={() => {
              setOpenModal(false);
              setEditIndex(null);
            }}
            updateAppointments={setAppointments}
            existingAppointment={
              editIndex !== null ? filteredAppointments[editIndex] : null
            }
            editIndex={editIndex}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarView;

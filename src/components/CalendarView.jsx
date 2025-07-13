import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAppointments, deleteAppointment } from "../utils/storage";
import AppointmentModal from "./AppointmentModal";
import { handleDeleteConfirm } from "./handleDeleteConfirm";
import Navigation from "./Navigation";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const statuscolor = {
    Booked: "text-blue-600",
    Cancelled: "text-red-500",
    Rounding: "text-yellow-500",
    Completed: "text-green-600",
  };

  return (
    <div className="bg-[var(--secondarycolor)] h-screen overflow-hidden">
      <Navigation />
      <div className="p-4 h-[70vh] h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-[var(--textcolorteritery)]">
          Calendar
        </h2>
        <div className="flex flex-col lg:flex-row gap-4 align-center items-center">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="rounded-lg shadow"
            onClickDay={(value) => {
              setSelectedDate(value);
              setOpenModal(true);
            }}
            minDate={new Date()}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-[var(--textcolorteritery)]">
              {selectedDate.toDateString()}
            </h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search by patient"
                className="border p-2 rounded w-1/2 outline-[var(--primarycolor)]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="border p-2 rounded w-1/2 outline-[var(--primarycolor)]"
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
                  <option
                    key={i}
                    value={doc}
                    className="hover:bg-[var(--primarycolor)]"
                  >
                    {doc}
                  </option>
                ))}
              </select>
              <button
                className="bg-[var(--primarycolor)] text-[var(--textcolorsecondary)] px-4 py-2 rounded hover:animate-pulse"
                onClick={() => {
                  setEditIndex(null);
                  setOpenModal(true);
                }}
              >
                Booking
              </button>
            </div>

            <ul className="space-y-2">
              {filteredAppointments.map((appt, index) => (
                <li
                  key={index}
                  className="bg-[var(--teritorycolor)] p-3 rounded shadow text-[var(--textcolorprimary)]"
                >
                  <div className="w-full flex">
                    <div className="w-1/12 font-bold">Patient</div>
                    <div className="w-11/12">: {appt.patient}</div>
                  </div>
                  <div className="w-full flex">
                    <div className="w-1/12 font-bold">Doctor</div>
                    <div className="w-11/12 font-bold">: {appt.doctor}</div>
                  </div>
                  <div className="w-full flex">
                    <div className="w-1/12 font-bold">Time</div>
                    <div className="w-11/12">: {appt.time}</div>
                  </div>
                  <div className={`w-full flex ${statuscolor[appt.status]}`}>
                    <div className="w-1/12 font-bold">Status</div>
                    <div className="w-11/12 font-bold">: {appt.status}</div>
                  </div>
                  <div className="w-full flex">
                    <div className="w-1/12 font-bold">Token</div>
                    <div className="w-11/12">: {appt.token}</div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <EditSquareIcon
                      className="text-[var(--textcolorteritery)] cursor-pointer"
                      onClick={() => {
                        setEditIndex(index);
                        setOpenModal(true);
                      }}
                    />

                    <DeleteIcon
                      className="text-[var(--textcolorteritery)] cursor-pointer	"
                      onClick={() => handleDeleteConfirm(index, handleDelete)}
                    />
                  </div>
                </li>
              ))}
            </ul>
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

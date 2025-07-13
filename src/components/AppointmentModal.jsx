import { useState, useEffect } from "react";
import patients from "../data/patients.json";
import doctors from "../data/doctors.json";
import {
  saveAppointment,
  updateAppointment,
  getAppointments,
} from "../utils/storage";
import Select from "react-select";
import { toast } from "react-toastify";

const AppointmentModal = ({
  date,
  close,
  updateAppointments,
  existingAppointment = null,
  editIndex = null,
}) => {
  const [patient, setPatient] = useState(
    existingAppointment?.patient
      ? {
          label: existingAppointment.patient,
          value: existingAppointment.patient,
        }
      : null
  );
  const [doctor, setDoctor] = useState(
    existingAppointment?.doctor
      ? { label: existingAppointment.doctor, value: existingAppointment.doctor }
      : null
  );
  const [time, setTime] = useState(existingAppointment?.time || "");
  const [status, setStatus] = useState(existingAppointment?.status || "Booked");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!existingAppointment) {
      const existing = getAppointments();
      const todayAppointments = existing[date.toDateString()] || [];
      const maxToken =
        todayAppointments.length > 0
          ? Math.max(
              ...todayAppointments.map((appt) => parseInt(appt.token || 0) || 0)
            )
          : 0;
      setToken((maxToken + 1).toString());
    } else {
      setToken(existingAppointment.token || "");
    }
  }, [date, existingAppointment]);

  const handleSave = () => {
    if (!patient || !doctor || !time) {
      toast.error("Please fill all fields");
      return;
    }

    const newAppt = {
      patient: patient.label,
      doctor: doctor.label,
      time,
      status,
      token,
    };

    let result;
    if (editIndex !== null) {
      result = updateAppointment(date, editIndex, newAppt);
    } else {
      result = saveAppointment(date, newAppt);
      updateAppointments(result);
    }
    updateAppointments(result);
    close();
  };

  const patientOptions = patients.map((p) => ({ value: p, label: p }));
  const doctorOptions = doctors.map((d) => ({ value: d, label: d }));

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-xl font-bold mb-4">Add Appointment</h3>

        <div className="mb-4">
          <Select
            options={patientOptions}
            value={patient}
            onChange={setPatient}
            placeholder="Select Patient"
          />
        </div>

        <div className="mb-4">
          <Select
            options={doctorOptions}
            value={doctor}
            onChange={setDoctor}
            placeholder="Select Doctor"
          />
        </div>

        <input
          type="time"
          className="w-full p-2 border mb-4 rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <select
          className="w-full p-2 border mb-4 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Booked">Booked</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Rounding">Rounding</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Token Number"
          className="w-full p-2 border mb-4 rounded bg-gray-100 cursor-not-allowed"
          value={token}
          disabled
        />

        <div className="flex justify-end gap-2">
          <button className="text-gray-500" onClick={close}>
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;

import { useState } from "react";
import patients from "../data/patients.json";
import doctors from "../data/doctors.json";
import Select from "react-select";
import { toast } from "react-toastify";
import { saveAppointment } from "../utils/storage";

const AppointmentModal = ({ date, close, updateAppointments }) => {
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [time, setTime] = useState("");

  const handleSave = () => {
    if (!patient || !doctor || !time) {
      toast.error("Please fill all fields");
      return;
    }

    const result = saveAppointment(date, {
      patient: patient.label,
      doctor: doctor.label,
      time,
    });
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
            placeholder="Select Patient"
            onChange={setPatient}
          />
        </div>

        <div className="mb-4">
          <Select
            options={doctorOptions}
            value={doctor}
            placeholder="Select Doctor"
            onChange={setDoctor}
          />
        </div>

        <input
          type="time"
          className="w-full p-2 border mb-4 rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
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

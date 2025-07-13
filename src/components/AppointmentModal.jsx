import { useState } from "react";
import patients from "../data/patients.json";
import doctors from "../data/doctors.json";
import Select from "react-select";

const AppointmentModal = () => {
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [time, setTime] = useState("");

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
          />
        </div>

        <div className="mb-4">
          <Select
            options={doctorOptions}
            value={doctor}
            placeholder="Select Doctor"
          />
        </div>

        <input
          type="time"
          className="w-full p-2 border mb-4 rounded"
          value={time}
        />

        <div className="flex justify-end gap-2">
          <button className="text-gray-500" onClick={close}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;

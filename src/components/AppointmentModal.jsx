import { useState } from "react";

const AppointmentModal = () => {
  const [time, setTime] = useState("");

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-xl font-bold mb-4">Add Appointment</h3>
        <select className="w-full p-2 border mb-4 rounded">
          <option value="">Select Patient</option>
        </select>

        <select className="w-full p-2 border mb-4 rounded">
          <option value="">Select Doctor</option>
        </select>
        <input type="time" className="w-full p-2 border mb-4 rounded" />
        <div className="flex justify-end gap-2">
          <button className="text-gray-500">Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;

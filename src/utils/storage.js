export const getAppointments = () => {
    const raw = localStorage.getItem('appointments');
    return raw ? JSON.parse(raw) : {};
  };
  
  export const saveAppointment = (date, appointment) => {
    const key = date.toDateString();
    const existing = getAppointments();
    const updated = {
      ...existing,
      [key]: [...(existing[key] || []), appointment],
    };
    localStorage.setItem('appointments', JSON.stringify(updated));
    return updated;
  };
  
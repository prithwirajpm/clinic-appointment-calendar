// this function used for get appointment
export const getAppointments = () => {
    const raw = localStorage.getItem('appointments');
    return raw ? JSON.parse(raw) : {};
  };
  
  // this function used for book appointment
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
  
  // this function is used for update appointment
  export const updateAppointment = (date, index, newAppointment) => {
    const key = date.toDateString();
    const existing = getAppointments();
    if (!existing[key]) return existing;
  
    existing[key][index] = newAppointment;
    localStorage.setItem('appointments', JSON.stringify(existing));
    return existing;
  };
  
  // this function is used for delete appointment
  export const deleteAppointment = (date, index) => {
    const key = date.toDateString();
    const existing = getAppointments();
    if (!existing[key]) return existing;
  
    existing[key].splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(existing));
    return existing;
  };
  
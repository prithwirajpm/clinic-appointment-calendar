import "./App.css";
import AppointmentModal from "./components/AppointmentModal";
import CalendarView from "./components/CalendarView";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
      <LoginForm />
      <CalendarView />
      <AppointmentModal />
    </>
  );
}

export default App;

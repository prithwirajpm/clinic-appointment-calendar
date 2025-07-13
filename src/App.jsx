import "./App.css";
import AppointmentModal from "./components/AppointmentModal";
import CalendarView from "./components/CalendarView";
import LoginForm from "./components/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <LoginForm />
      <CalendarView />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

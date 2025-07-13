import "./App.css";
import CalendarView from "./components/CalendarView";
import LoginForm from "./components/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

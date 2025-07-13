import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "staff@clinic.com" && password === "123456") {
      localStorage.setItem("auth", "true");
      toast.success("Login successful!");
      navigate("/calendar");
    } else {
      //   alert("Invalid credentials");
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
      <div className="hidden md:block md:w-6/12 loginBackgroundImage"></div>
      <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 sm:w-12 grid place-content-center">
        <div className="grid place-content-center">
          <img
            src="/doctor.png"
            className="border border-1 rounded-full hover:animate-pulse"
            width={100}
            alt=""
            srcset=""
          />
        </div>
        <form
          className="bg-white p-6 rounded-2xl shadow-md w-96"
          onSubmit={handleLogin}
        >
          <h2 className="text-xl font-bold mb-4 text-center text-[var(--primarycolor)]">
            Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border mb-4 rounded outline-[var(--primarycolor)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-4 rounded outline-[var(--primarycolor)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[var(--primarycolor)] text-[var(--textcolorsecondary)] font-bold w-full p-2 rounded hover:animate-pulse">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useEffect, useState } from "react";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

function Navigation() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = stored === "dark";
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
  return (
    <div className="bg-[var(--primarycolor)] py-3 overflow-hidden px-2 flex justify-between">
      <div>
        <img
          src="/doctor.png"
          className="rounded-2xl bg-[var(--secondarycolor)] "
          width={40}
          alt=""
          srcset=""
        />
      </div>
      <div>
        <button
          onClick={toggleDarkMode}
          className="text-2xl p-2 rounded transition-all duration-300"
        >
          {isDark ? (
            <SunnyIcon className="text-white" />
          ) : (
            <BedtimeIcon className="text-white" />
          )}
        </button>
        <Link to={"/"}>
          <LogoutIcon className="text-white font-bold" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;

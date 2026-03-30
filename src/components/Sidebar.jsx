import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BarChartIcon from "@mui/icons-material/BarChart";

function Sidebar({ open, setOpen }) {
console.log(open);
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { name: "Users", path: "/users", icon: <PeopleIcon /> },
    { name: "Courses", path: "/courses", icon: <SchoolIcon /> },
    { name: "Enrollments", path: "/enrollments", icon: <AssignmentIcon /> },
    { name: "Attendance", path: "/attendance", icon: <CheckCircleIcon /> },
    { name: "Reports", path: "/reports", icon: <BarChartIcon /> },
  ];

  return (
    <div style={{
      width: open ? "250px" : "80px",
      height: "100vh",
      background: "#0f172a",
      color: "white",
      position: "fixed",
      transition: "0.3s",
      padding: "15px",   // ✅ FIXED
      zIndex: 1000       // ✅ FIXED
    }}>

      {/* Toggle Button */}
      <button
        onClick={() => {
          console.log("clicked");
          setOpen(prev => !prev);
        }}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "26px",
          cursor: "pointer",
          marginBottom: "30px",
          width: "100%",
          textAlign: open ? "right" : "center"
        }}
      >
        ☰
      </button>

      {/* Title */}
      {open && <h2>Attendance</h2>}

      {/* Menu */}
      {menu.map(item => {

        const active = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "white",
              background: active ? "#2563eb" : "transparent"
            }}
          >
            {item.icon}
            {open && item.name}
          </Link>
        );
      })}

    </div>
  );
}

export default Sidebar;
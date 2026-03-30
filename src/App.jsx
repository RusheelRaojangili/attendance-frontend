import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";

function App() {

  const [open, setOpen] = useState(true);

  return (
    <Router>

      <div style={{ display: "flex" }}>

        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Main Content (LIGHT BACKGROUND ✅) */}
        <div style={{
          marginLeft: open ? "250px" : "80px",
          padding: "30px",
          width: "100%",
          transition: "0.3s",
          minHeight: "100vh",
          background: "#f1f5f9"   // ✅ LIGHT LIKE REFERENCE
        }}>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/enrollments" element={<Enrollments />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>

        </div>

      </div>

    </Router>
  );
}

export default App;
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      display: "flex",
      gap: "20px",
      padding: "15px",
      background: "#222",
      color: "white"
    }}>
      
      <Link to="/" style={{color:"white"}}>Dashboard</Link>
      <Link to="/users" style={{color:"white"}}>Users</Link>
      <Link to="/courses" style={{color:"white"}}>Courses</Link>
      <Link to="/enrollments" style={{color:"white"}}>Enrollments</Link>
      <Link to="/attendance" style={{color:"white"}}>Attendance</Link>
      <Link to="/reports" style={{color:"white"}}>Reports</Link>

    </div>
  );
}

export default Navbar;
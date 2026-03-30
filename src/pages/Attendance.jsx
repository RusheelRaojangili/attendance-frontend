import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  MenuItem,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function Attendance(){

  const [users,setUsers] = useState([]);
  const [courses,setCourses] = useState([]);
  const [attendance,setAttendance] = useState([]);

  const [userId,setUserId] = useState("");
  const [courseId,setCourseId] = useState("");
  const [date,setDate] = useState("");
  const [status,setStatus] = useState("");

  // load data
  const loadData = () =>{
    API.get("/users").then(res=>setUsers(res.data));
    API.get("/courses").then(res=>setCourses(res.data));
    API.get("/attendance").then(res=>setAttendance(res.data));
  };

  useEffect(()=>{
    loadData();
  },[]);

  // mark attendance
  const markAttendance = () =>{

    const newAttendance = {
      userId: userId,
      courseId: courseId,
      date: date,
      status: status
    };

    API.post("/attendance", newAttendance)
      .then(()=>{
        loadData();
        setUserId("");
        setCourseId("");
        setDate("");
        setStatus("");
      })
      .catch(err=>console.log(err));
  };

  return(
    <Box>

      {/* TITLE */}
      <Typography variant="h4" mb={3}>
        Attendance
      </Typography>

      {/* FORM */}
      <Card sx={{ mb: 4 }}>
        <CardContent>

          <Typography variant="h6" mb={2}>
            Mark Attendance
          </Typography>

          <Grid container spacing={2}>

            {/* Student */}
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Student"
                value={userId}
                onChange={(e)=>setUserId(e.target.value)}
              >
                {users.map(user=>(
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Course */}
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Course"
                value={courseId}
                onChange={(e)=>setCourseId(e.target.value)}
              >
                {courses.map(course=>(
                  <MenuItem key={course.id} value={course.id}>
                    {course.courseName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Date */}
            <Grid item xs={12} md={2}>
              <TextField
                type="date"
                fullWidth
                value={date}
                onChange={(e)=>setDate(e.target.value)}
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                label="Status"
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
              >
                <MenuItem value="PRESENT">Present</MenuItem>
                <MenuItem value="ABSENT">Absent</MenuItem>
              </TextField>
            </Grid>

            {/* Button */}
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={markAttendance}
                sx={{ height: "56px" }}
              >
                Submit
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardContent>

          <Typography variant="h6" mb={2}>
            Attendance Records
          </Typography>

          <Paper>

            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Student</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {attendance.map(item=>{

                  const user = users.find(u=>u.id === item.userId);
                  const course = courses.find(c=>c.id === item.courseId);

                  return(
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>{course?.courseName}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  );
                })}

              </TableBody>

            </Table>

          </Paper>

        </CardContent>
      </Card>

    </Box>
  );
}

export default Attendance;
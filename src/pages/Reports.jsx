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
  TextField
} from "@mui/material";

function Reports(){

  const [users,setUsers] = useState([]);
  const [courses,setCourses] = useState([]);

  const [userId,setUserId] = useState("");
  const [courseId,setCourseId] = useState("");
  const [percentage,setPercentage] = useState(null);

  // load users & courses
  useEffect(()=>{
    API.get("/users").then(res=>setUsers(res.data));
    API.get("/courses").then(res=>setCourses(res.data));
  },[]);

  // fetch percentage
  const getReport = () =>{

    API.get(`/attendance/percentage?userId=${userId}&courseId=${courseId}`)
      .then(res=>{
        setPercentage(res.data);
      })
      .catch(err=>console.log(err));
  };

  return(
    <Box>

      {/* TITLE */}
      <Typography variant="h4" mb={3}>
        Reports
      </Typography>

      {/* FILTER CARD */}
      <Card sx={{ mb: 4 }}>
        <CardContent>

          <Typography variant="h6" mb={2}>
            Check Attendance Percentage
          </Typography>

          <Grid container spacing={2}>

            {/* Student */}
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Select Student"
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
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Select Course"
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

            {/* Button */}
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={getReport}
                sx={{ height: "56px" }}
              >
                Get Report
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

      {/* RESULT */}
      {percentage !== null && (
        <Card>
          <CardContent>

            <Typography variant="h5">
              Attendance Percentage
            </Typography>

            <Typography
              variant="h3"
              color="primary"
              mt={2}
            >
              {percentage.toFixed(2)}%
            </Typography>

          </CardContent>
        </Card>
      )}

    </Box>
  );
}

export default Reports;
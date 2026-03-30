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

function Enrollments(){

  const [users,setUsers] = useState([]);
  const [courses,setCourses] = useState([]);
  const [enrollments,setEnrollments] = useState([]);

  const [userId,setUserId] = useState("");
  const [courseId,setCourseId] = useState("");

  // Load all data
  const loadData = () =>{
    API.get("/users").then(res=>setUsers(res.data));
    API.get("/courses").then(res=>setCourses(res.data));
    API.get("/enrollments").then(res=>setEnrollments(res.data));
  };

  useEffect(()=>{
    loadData();
  },[]);

  // Enroll student
  const enroll = () =>{

    const newEnrollment = {
      userId: userId,
      courseId: courseId
    };

    API.post("/enrollments", newEnrollment)
      .then(()=>{
        loadData();
        setUserId("");
        setCourseId("");
      })
      .catch(err=>console.log(err));
  };

  return(
    <Box>

      {/* Title */}
      <Typography variant="h4" mb={3}>
        Enrollments
      </Typography>

      {/* Enroll Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>

          <Typography variant="h6" mb={2}>
            Enroll Student
          </Typography>

          <Grid container spacing={2}>

            {/* Select Student */}
            <Grid item xs={12} md={5}>
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

            {/* Select Course */}
            <Grid item xs={12} md={5}>
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
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={enroll}
                sx={{ height: "56px" }}
              >
                Enroll
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent>

          <Typography variant="h6" mb={2}>
            All Enrollments
          </Typography>

          <Paper>

            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Student</TableCell>
                  <TableCell>Course</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {enrollments.map(enroll=>{

                  const user = users.find(u=>u.id === enroll.userId);
                  const course = courses.find(c=>c.id === enroll.courseId);

                  return(
                    <TableRow key={enroll.id}>
                      <TableCell>{enroll.id}</TableCell>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>{course?.courseName}</TableCell>
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

export default Enrollments;
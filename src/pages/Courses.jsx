import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function Courses(){

  const [courses,setCourses] = useState([]);
  const [name,setName] = useState("");
  const [code,setCode] = useState("");

  const loadCourses = () =>{
    API.get("/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  };

  useEffect(()=>{
    loadCourses();
  },[]);

  const addCourse = () =>{

    const newCourse = {
      courseName: name,
      courseCode: code
    };

    API.post("/courses",newCourse)
      .then(()=>{
        loadCourses();
        setName("");
        setCode("");
      })
      .catch(err=>console.log(err));
  };

  return(
    <Box>

      {/* Page Title */}
      <Typography variant="h4" mb={3}>
        Courses
      </Typography>

      {/* Add Course Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Add Course
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Course Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Course Code"
                value={code}
                onChange={(e)=>setCode(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={addCourse}
                sx={{ height: "56px" }}
              >
                Add
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardContent>

          <Typography variant="h6" mb={2}>
            All Courses
          </Typography>

          <Paper>

            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Course Code</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {courses.map(course =>(
                  <TableRow key={course.id}>
                    <TableCell>{course.id}</TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>{course.courseCode}</TableCell>
                  </TableRow>
                ))}

              </TableBody>

            </Table>

          </Paper>

        </CardContent>
      </Card>

    </Box>
  )

}

export default Courses;
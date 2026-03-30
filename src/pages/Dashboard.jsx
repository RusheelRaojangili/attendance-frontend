import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Dashboard() {

  const data = [
    { name: "Mon", attendance: 80 },
    { name: "Tue", attendance: 75 },
    { name: "Wed", attendance: 90 },
    { name: "Thu", attendance: 60 },
    { name: "Fri", attendance: 85 }
  ];

  const stats = [
    {
      title: "Total Students",
      value: 10,
      icon: <PeopleIcon fontSize="medium" />,
      color: "#6366f1"
    },
    {
      title: "Total Courses",
      value: 5,
      icon: <SchoolIcon fontSize="medium" />,
      color: "#22c55e"
    },
    {
      title: "Total Enrollments",
      value: 8,
      icon: <AssignmentIcon fontSize="medium" />,
      color: "#f97316"
    },
    {
      title: "Attendance",
      value: "80%",
      icon: <CheckCircleIcon fontSize="medium" />,
      color: "#ec4899"
    }
  ];

  return (
    <Box>

      {/* HEADER */}
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#0f172a">
            Good morning 👋
          </Typography>

          <Typography color="#64748b">
            Here's what's happening with your system
          </Typography>
        </Box>

        <Box
          sx={{
            background: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            fontWeight: "500"
          }}
        >
          📅 {new Date().toDateString()}
        </Box>
      </Box>

      {/* STAT CARDS */}
      <Grid container spacing={3}>

        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>

            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                }
              }}
            >
              <CardContent>

                <Box display="flex" justifyContent="space-between" alignItems="center">

                  {/* TEXT */}
                  <Box>
                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "14px",
                        fontWeight: 500
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        color: "#0f172a",
                        marginTop: "5px"
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>

                  {/* ICON */}
                  <Box
                    sx={{
                      background: item.color,
                      borderRadius: "12px",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white"
                    }}
                  >
                    {item.icon}
                  </Box>

                </Box>

              </CardContent>
            </Card>

          </Grid>
        ))}

      </Grid>

      {/* CHART */}
      <Card
        sx={{
          mt: 4,
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >
        <CardContent>

          <Typography
            variant="h6"
            sx={{
              marginBottom: "20px",
              fontWeight: "600",
              color: "#0f172a"
            }}
          >
            Weekly Attendance
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar
                dataKey="attendance"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}   // rounded bars 🔥
              />
            </BarChart>
          </ResponsiveContainer>

        </CardContent>
      </Card>

    </Box>
  );
}

export default Dashboard;
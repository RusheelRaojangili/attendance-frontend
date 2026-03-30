import { useEffect, useState } from "react";
import API from "../services/api";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

function Users() {

  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const loadUsers = () => {
    API.get("/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = () => {

    const newUser = { name, email, password, role };

    API.post("/users", newUser)
      .then(() => {
        loadUsers();
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
      });
  };

  return (
    <div>

      <Typography variant="h4" mb={3}>
        Users Management
      </Typography>

      {/* ADD USER CARD */}
      <Card sx={{ mb: 4, borderRadius: "12px" }}>
        <CardContent>

          <Typography variant="h6" mb={2}>
            Add User
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={3}>
              <TextField fullWidth label="Name" value={name}
                onChange={(e)=>setName(e.target.value)} />
            </Grid>

            <Grid item xs={3}>
              <TextField fullWidth label="Email" value={email}
                onChange={(e)=>setEmail(e.target.value)} />
            </Grid>

            <Grid item xs={2}>
              <TextField fullWidth label="Password" value={password}
                onChange={(e)=>setPassword(e.target.value)} />
            </Grid>

            <Grid item xs={2}>
              <TextField fullWidth label="Role" value={role}
                onChange={(e)=>setRole(e.target.value)} />
            </Grid>

            <Grid item xs={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={addUser}
                sx={{ height: "100%" }}
              >
                Add
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

      {/* TABLE */}
      <Card sx={{ borderRadius: "12px" }}>
        <CardContent>

          <Typography variant="h6" mb={2}>
            All Users
          </Typography>

          <Table>

            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}

            </TableBody>

          </Table>

        </CardContent>
      </Card>

    </div>
  );
}

export default Users;
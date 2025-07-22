import { useState } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography, Container } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { username, password }, { withCredentials: true });
      setUser({ username, role: res.data.role });
      navigate("/portfolio");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Username" fullWidth sx={{ mt: 2 }} value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Password" type="password" fullWidth sx={{ mt: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

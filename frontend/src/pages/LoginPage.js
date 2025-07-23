import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
  Fade,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        { username, password },
        { withCredentials: true }
      );
      setUser({ username, role: res.data.role });
      navigate("/portfolio");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Fade in>
        <Card
          elevation={8}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #e3f2fd 0%, #fff 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <LockOutlined sx={{ fontSize: 48, color: "#1976d2" }} />
              <Typography variant="h4" fontWeight={700} color="#1976d2" mt={1}>
                Investor Dashboard
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mt={1}>
                Sign in to your account
              </Typography>
            </Box>
            <form onSubmit={handleSubmit} autoComplete="off">
              <TextField
                label="Username"
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && (
                <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                  {error}
                </Typography>
              )}
              <Box sx={{ mt: 3, position: "relative" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    borderRadius: 2,
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
              </Box>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Demo credentials: <br />
                  <strong>admin / admin123</strong>
                  <strong>viewer / viewer123</strong>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
}

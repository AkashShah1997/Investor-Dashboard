import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleTheme }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Investor Dashboard</Typography>
        {user && (
          <>
            <Button color="inherit" onClick={() => navigate("/portfolio")}>Portfolio</Button>
            <Button color="inherit" onClick={() => navigate("/transactions")}>Transactions</Button>
            {user.role === "admin" && <Button color="inherit" onClick={() => navigate("/reports")}>Reports</Button>}
            <Button color="inherit" onClick={toggleTheme}>Toggle Theme</Button>
            <Button color="inherit" onClick={() => { setUser(null); navigate("/"); }}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

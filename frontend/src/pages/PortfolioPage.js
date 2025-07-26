import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Fade,
  Avatar,
  Divider,
  Chip,
  Skeleton,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useAuth } from "../context/AuthContext";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SearchBar from "../components/SearchBar";

export default function PortfolioPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredPortfolio, setFilteredPortfolio] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/data/portfolio`, { withCredentials: true })
      .then((res) => setPortfolio(res.data))
      .catch(() => setPortfolio([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user?.role === "admin" && search.trim()) {
      setFilteredPortfolio(
        portfolio.filter((item) =>
          item.username.toLowerCase().includes(search.trim().toLowerCase())
        )
      );
    } else {
      setFilteredPortfolio(portfolio);
    }
  }, [portfolio, search, user]);

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Fade in>
        <Box>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
              <AccountBalanceWalletIcon />
            </Avatar>
            <Typography variant="h4" fontWeight={700} color="#1976d2">
              Portfolio
            </Typography>
            <Chip
              label={user.role === "admin" ? "Admin View" : "User View"}
              color={user.role === "admin" ? "primary" : "default"}
              sx={{ ml: 2, fontWeight: 600 }}
            />
          </Box>
          {user.role === "admin" && (
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Username"
            />
          )}
          <Divider sx={{ mb: 3 }} />
          {loading ? (
            <Skeleton variant="rectangular" height={300} />
          ) : user.role === "admin" ? (
            <AdminPortfolioView portfolio={filteredPortfolio} />
          ) : (
            <UserPortfolioView portfolio={portfolio} />
          )}
        </Box>
      </Fade>
    </Container>
  );
}

function AdminPortfolioView({ portfolio }) {
  if (!portfolio.length)
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
        No data available.
      </Typography>
    );

  const grouped = portfolio.reduce((acc, item) => {
    acc[item.username] = acc[item.username] || [];
    acc[item.username].push(item);
    return acc;
  }, {});

  return (
    <Grid container spacing={3}>
      {Object.keys(grouped).map((username) => {
        const total = grouped[username].reduce((sum, i) => sum + Number(i.value), 0);
        return (
          <Grid item xs={12} sm={6} md={4} key={username}>
            <Fade in>
              <Card elevation={6} sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>{username[0].toUpperCase()}</Avatar>
                    <Typography variant="h6" fontWeight={600}>
                      {username}'s Investments
                    </Typography>
                    <Chip
                      label={`Total: $${total.toLocaleString()}`}
                      color="success"
                      sx={{ ml: 2, fontWeight: 600 }}
                    />
                  </Box>
                  <Table size="small" sx={{ mb: 2 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Investment Name</TableCell>
                        <TableCell align="right">Value ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {grouped[username].map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.investment_name}</TableCell>
                          <TableCell align="right">{item.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={grouped[username]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="investment_name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1976d2" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        );
      })}
    </Grid>
  );
}

function UserPortfolioView({ portfolio }) {
  if (!portfolio.length)
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
        No data found.
      </Typography>
    );

  const total = portfolio.reduce((sum, i) => sum + Number(i.value), 0);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card elevation={5} sx={{ borderRadius: 3, mb: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Total Portfolio Value:
              </Typography>
              <Chip
                label={`$${total.toLocaleString()}`}
                color="success"
                sx={{ ml: 2, fontWeight: 600, fontSize: "1.1rem" }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {portfolio.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Fade in>
            <Card elevation={4} sx={{ borderRadius: 3, height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Investment
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {item.investment_name}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight={700} sx={{ mt: 1 }}>
                  ${item.value}
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
}

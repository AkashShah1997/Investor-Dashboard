import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Container, Grid, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useAuth } from "../context/AuthContext";

export default function PortfolioPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/data/portfolio", { withCredentials: true })
      .then(res => setPortfolio(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Portfolio</Typography>
      {user.role === "admin" ? (
        <AdminPortfolioView portfolio={portfolio} />
      ) : (
        <UserPortfolioView portfolio={portfolio} />
      )}
    </Container>
  );
}

function AdminPortfolioView({ portfolio }) {
  if (!portfolio.length) return <Typography>No data available.</Typography>;

  const grouped = portfolio.reduce((acc, item) => {
    acc[item.username] = acc[item.username] || [];
    acc[item.username].push(item);
    return acc;
  }, {});

  return (
    <Grid container spacing={2}>
      {Object.keys(grouped).map(username => (
        <Grid item xs={12} key={username}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>{username}'s Investments</Typography>

              {/* Table of Investments */}
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Investment Name</TableCell>
                    <TableCell align="right">Value ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {grouped[username].map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.investment_name}</TableCell>
                      <TableCell align="right">{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Bar Chart */}
              <ResponsiveContainer width="100%" height={250}>
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
        </Grid>
      ))}
    </Grid>
  );
}

function UserPortfolioView({ portfolio }) {
  if (!portfolio.length) return <Typography>No data found.</Typography>;

  return (
    <Grid container spacing={2}>
      {portfolio.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{item.investment_name}</Typography>
              <Typography>${item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

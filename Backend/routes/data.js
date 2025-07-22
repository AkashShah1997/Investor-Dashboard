import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Container } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function ReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (user?.role === "admin") {
      axios.get("http://localhost:5000/data/reports", { withCredentials: true })
        .then(res => setReports(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (user?.role !== "admin") {
    return <Container sx={{ mt: 4 }}><Typography color="error">Access Denied: Admins Only</Typography></Container>;
  }

  // Helper function to convert JSON to CSV string
  const jsonToCSV = (items) => {
    if (!items.length) return "";

    const replacer = (key, value) => value === null ? '' : value; 
    const header = Object.keys(items[0]);
    const csv = [
      header.join(','), 
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');

    return csv;
  };

  const handleDownloadCSV = (username) => {
    // Filter reports for the given username
    const userReports = reports.filter(r => r.username === username);

    if (!userReports.length) {
      alert(`No reports found for user: ${username}`);
      return;
    }

    const csvData = jsonToCSV(userReports);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${username}_reports.csv`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Reports Overview</Typography>

      <Grid container spacing={2}>
        {reports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <Card>
              <CardContent>
                <Typography><b>User:</b> {report.username}</Typography>
                <Typography><b>Created At:</b> {report.created_at}</Typography>
                <Typography><b>Report URL:</b> {report.report_url}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={() => handleDownloadCSV(report.username)}
                >
                  Download {report.username}'s Reports CSV
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

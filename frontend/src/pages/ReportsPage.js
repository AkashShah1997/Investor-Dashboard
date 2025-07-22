import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Container } from "@mui/material";
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

const handleDownloadUserInvestments = (username) => {
  axios.get(`http://localhost:5000/data/portfolio/${username}`, { withCredentials: true })
    .then(res => {
      const data = res.data;
      if (!data.length) return alert(`No investments found for ${username}`);

      // Convert JSON array to CSV string
      const replacer = (key, value) => (value === null ? '' : value);
      const header = Object.keys(data[0]);
      const csv = [
        header.join(','), // header row first
        ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n');

      // Create blob and trigger download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${username}_investments.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch(err => console.error(err));
};


  if (user?.role !== "admin") {
    return <Container sx={{ mt: 4 }}><Typography color="error">Access Denied: Admins Only</Typography></Container>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Reports Overview</Typography>

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Report URL</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Download Investments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.username}</TableCell>
                  <TableCell>{report.report_url}</TableCell>
                  <TableCell>{report.created_at}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleDownloadUserInvestments(report.username)}>
                      Download Investments
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}

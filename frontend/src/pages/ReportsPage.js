import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Box,
  Chip,
  Skeleton,
  Fade,
  Link,
  Divider,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";

export default function ReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "admin") {
      axios
        .get("http://localhost:5000/data/reports", { withCredentials: true })
        .then((res) => setReports(res.data))
        .catch(() => setReports([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleDownloadUserInvestments = (username) => {
    axios
      .get(`http://localhost:5000/data/portfolio/${username}`, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        if (!data.length) return alert(`No investments found for ${username}`);

        const replacer = (key, value) => (value === null ? "" : value);
        const header = Object.keys(data[0]);
        const csv = [
          header.join(","),
          ...data.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(","))
        ].join("\r\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${username}_investments.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(() => alert("Failed to download investments."));
  };

  if (user?.role !== "admin") {
    return (
      <Container sx={{ mt: 6 }}>
        <Fade in>
          <Card elevation={6} sx={{ borderRadius: 3, p: 3, textAlign: "center" }}>
            <Typography variant="h5" color="error" fontWeight={700}>
              Access Denied
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              This page is for <Chip label="Admins Only" color="primary" />.
            </Typography>
          </Card>
        </Fade>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Fade in>
        <Box>
          <Box display="flex" alignItems="center" mb={2}>
            <DescriptionIcon sx={{ fontSize: 40, color: "#1976d2", mr: 2 }} />
            <Typography variant="h4" fontWeight={700} color="#1976d2">
              Reports Overview
            </Typography>
            <Chip label="Admin Panel" color="primary" sx={{ ml: 2, fontWeight: 600 }} />
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Card elevation={5} sx={{ borderRadius: 3 }}>
            <CardContent>
              {loading ? (
                <Skeleton variant="rectangular" height={220} />
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Report Link</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell align="center">Download Investments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography color="text.secondary">No reports found.</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      reports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <Chip label={report.username} color="info" sx={{ fontWeight: 600 }} />
                          </TableCell>
                          <TableCell>
                            <Link
                              href={report.report_url}
                              target="_blank"
                              rel="noopener"
                              underline="hover"
                              sx={{ fontWeight: 500 }}
                            >
                              {report.report_url}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {new Date(report.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              startIcon={<DownloadIcon />}
                              onClick={() => handleDownloadUserInvestments(report.username)}
                              sx={{ fontWeight: 600, borderRadius: 2 }}
                            >
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Container>
  );
}

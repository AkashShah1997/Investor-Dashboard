import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Container,
  Chip,
  Box,
  Skeleton,
  Fade,
  Divider,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SearchBar from "../components/SearchBar";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/data/transactions", { withCredentials: true })
      .then((res) => setTransactions(res.data))
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (search.trim()) {
      setFilteredTransactions(
        transactions.filter((tx) =>
          tx.username.toLowerCase().includes(search.trim().toLowerCase())
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [transactions, search]);

  return (
    <Container sx={{ mt: 4 }}>
      <Fade in>
        <Box>
          <Box display="flex" alignItems="center" mb={2}>
            <AccountBalanceWalletIcon sx={{ fontSize: 36, color: "#1976d2", mr: 2 }} />
            <Typography variant="h4" fontWeight={700} color="#1976d2">
              Recent Transactions
            </Typography>
            <Chip
              icon={<AttachMoneyIcon />}
              label="Live"
              color="success"
              sx={{ ml: 2, fontWeight: 600 }}
            />
          </Box>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Username"
          />
          <Divider sx={{ mb: 2 }} />
          <Paper elevation={4} sx={{ borderRadius: 3 }}>
            {loading ? (
              <Skeleton variant="rectangular" height={220} />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Holder Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount ($)</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography color="text.secondary">No transactions found.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <Chip
                            label={tx.username}
                            color="info"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: tx.amount > 0 ? "green" : "error.main" }}>
                          {tx.amount > 0 ? "+" : ""}
                          {tx.amount}
                        </TableCell>
                        <TableCell>
                          {new Date(tx.date).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
}

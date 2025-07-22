import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Container } from "@mui/material";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/data/transactions", { withCredentials: true })
      .then(res => setTransactions(res.data));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Recent Transactions</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Holder Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount ($)</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(tx => (
              <TableRow key={tx.id}>
                <TableCell>{tx.username}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{tx.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

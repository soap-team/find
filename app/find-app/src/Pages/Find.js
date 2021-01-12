import React from 'react';
import {
  Link
} from 'react-router-dom';
import { 
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';

function createData(id, desc, cons, stat, mod, vis, hit) {
  return { id, desc, cons, stat, mod, vis, hit };
}

const rows = [
  createData(0, 'Wall', 'Warn', 'Enabled', 'date', 'private', 5),
  createData(1, 'test', 'Warn', 'Enabled', 'date', 'private', 10),
];

function Find() {
  return (
    <>
      <Typography component="h1" variant="h4">FIND</Typography>
      <Button variant="outlined" color="secondary">Create a new filter</Button>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Filter ID</TableCell>
              <TableCell>Public description</TableCell>
              <TableCell>Consequences</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last modified</TableCell>
              <TableCell>Visibility</TableCell>
              <TableCell>Hit count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Link to={`${row.id}`}>{row.id}</Link>
                </TableCell>
                <TableCell>
                  <Link to={`${row.id}`}>{row.desc}</Link>  
                </TableCell>
                <TableCell>{row.cons}</TableCell>
                <TableCell>{row.stat}</TableCell>
                <TableCell>{row.mod}</TableCell>
                <TableCell>{row.vis}</TableCell>
                <TableCell>{row.hit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Find;

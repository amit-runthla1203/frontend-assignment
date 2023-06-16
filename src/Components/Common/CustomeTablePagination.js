import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import { Link } from "react-router-dom";
import { calculateAge } from "../../get-players";

const CustomeTablePagination = ({ rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      style={{
        margin: "auto",
        marginTop: "30px",
        width: "90%",
        overflow: "hidden"
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {["Name", "Type", "Points", "Rank", "Age"].map(column => (
                <TableCell
                  key={column}
                  align={column}
                  style={{ minWidth: "250px", fontWeight: "bold" }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {["name", "type", "points", "rank", "dob"].map(column => {
                      const value =
                        column === "dob"
                          ? calculateAge(row["dob"])
                          : row[column];
                      return (
                        <TableCell key={column} align={column}>
                          {column === "name" ? (
                            <Link to={`/cricketer/${row.id}`}>{value}</Link>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomeTablePagination;

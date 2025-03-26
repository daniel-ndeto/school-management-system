import React, { useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material';

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0); // Current page for pagination
    const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows displayed per page

    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column, index) => (
                                <StyledTableCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label} {/* Render column headers */}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate rows
                            .map((row) => (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column, index) => {
                                        const value = row[column.id]; // Get cell value
                                        return (
                                            <StyledTableCell key={index} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value) // Format value if applicable
                                                    : value}
                                            </StyledTableCell>
                                        );
                                    })}
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]} // Options for rows per page
                component="div"
                count={rows.length} // Total number of rows
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)} // Handle page change
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
                    setPage(0); // Reset to the first page
                }}
            />
        </>
    );
};

export default TableViewTemplate;
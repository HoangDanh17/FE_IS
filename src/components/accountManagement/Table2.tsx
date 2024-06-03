'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from './EditModal';
import "@/styles/accountManagement/DataTable.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CustomTablePagination = styled(TablePagination)(({ theme }) => ({
    '& .MuiTablePagination-root': {
        color: theme.palette.primary.main,
    },
}));

let idCounter = 1;
function createData(
    name: string,
    email: string,
    password: string,
    role: string,
) {
    const id = idCounter++;
    return { id, name, email, password, role };
}

const rows = [
    createData('Nguyễn Văn A', "test@gmail.com", "abcdefg", "Admin"),
    createData('Nguyễn Văn B', "test@gmail.com", "abcdefg", "Admin"),
    createData('Nguyễn Văn C', "test@gmail.com", "abcdefg", "Admin"),
    createData('Nguyễn Văn D', "test@gmail.com", "abcdefg", "Admin"),
    createData('Nguyễn Văn E', "test@gmail.com", "abcdefg", "Admin"),
    createData('Nguyễn Văn F', "test@gmail.com", "abcdefg", "Admin"),
    createData('Nguyễn Văn G', "test@gmail.com", "abcdefg", "Admin"),
    createData('Nguyễn Văn H', "test@gmail.com", "abcdefg", "Admin"),
    createData('Nguyễn Văn I', "test@gmail.com", "abcdefg", "Admin"),
    createData('Nguyễn Văn J', "test@gmail.com", "abcdefg", "Admin"),
];

const Table2 = () => {
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [dataUpdate, setDataUpdate] = React.useState(null);

    //Close Edit Modal
    const handleCloseEditModal = () => setOpenEditModal(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditClick = (rowData: any) => {
        setDataUpdate(rowData);
        setOpenEditModal(true);
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>STT</StyledTableCell>
                            <StyledTableCell>Họ và Tên</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Mật khẩu</StyledTableCell>
                            <StyledTableCell>Role</StyledTableCell>
                            <StyledTableCell align='center'>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row" align='center'>
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{row.password}</StyledTableCell>
                                <StyledTableCell>{row.role}</StyledTableCell>
                                <StyledTableCell align='center'>
                                    <EditIcon
                                        style={{ marginRight: "10px" }}
                                        onClick={() => handleEditClick(row)}
                                    />
                                    <DeleteIcon />
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="custom-row custom-pagination"
            />

            <EditModal
                onClose={handleCloseEditModal}
                openEditModal={openEditModal}
                setOpenEditModal={setOpenEditModal}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div>
    );
};
export default Table2;
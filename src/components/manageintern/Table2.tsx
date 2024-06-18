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
import Checkbox from '@mui/material/Checkbox';
import Popover from '@mui/material/Popover';
import EditModal from './EditModal';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeleteModal from './DeleteModal'
import "@/components/css/manageintern/DataTable.css";

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
function createData(accountID, name, email, phoneNumber, ojtid, skill) {
    const id = idCounter++;
    return { id, accountID, name, email, phoneNumber, ojtid, skill };
}

const rows = [
    createData('SE170001','Nguyễn Văn A', "test@gmail.com", "012345789", "NB0001", ["Coding", "Design"]),
    createData('SE170001','Nguyễn Văn B', "test@gmail.com", "012345789", "NB0001", ["Coding"]),
    createData('SE170001','Nguyễn Văn C', "test@gmail.com", "012345789", "NB0001", ["Design"]),
    createData('SE170001','Nguyễn Văn D', "test@gmail.com", "012345789", "NB0001", ["Coding", "Design", "Project Management"]),
    createData('SE170001','Nguyễn Văn E', "test@gmail.com", "012345789", "NB0001", ["Coding", "Design"]),
    createData('SE170001','Nguyễn Văn F', "test@gmail.com", "012345789", "NB0001", ["Project Management"]),
    createData('SE170001','Nguyễn Văn G', "test@gmail.com", "012345789", "NB0001", ["Coding"]),
    createData('SE170001','Nguyễn Văn H', "test@gmail.com", "012345789", "NB0001", ["Design"]),
    createData('SE170001','Nguyễn Văn I', "test@gmail.com", "012345789", "NB0001", ["Project Management"]),
    createData('SE170001','Nguyễn Văn J', "test@gmail.com", "012345789", "NB0001", ["Coding", "Design"]),
];

const Table2 = () => {
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [dataUpdate, setDataUpdate] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [selectedRowData, setSelectedRowData] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popoverContent, setPopoverContent] = React.useState('');

    const handlePopoverOpen = (event, skill) => {
        setAnchorEl(event.currentTarget);
        setPopoverContent(skill);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverContent('');
    };

    const openPopover = Boolean(anchorEl);

    // const handleCloseEditModal = () => setOpenEditModal(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditClick = (rowData) => {
        setDataUpdate(rowData);
        setOpenEditModal(true);
    };

    const handleSelectRow = (event, id) => {
        if (selectedRow === id) {
            setSelectedRow(null); // Deselect if the same row is clicked again
        } else {
            setSelectedRow(id);
            setSelectedRow(email);
        }
    };

    const isSelected = (id) => selectedRow === id;

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">
                                {/* No need for a select all checkbox in single selection mode */}
                            </StyledTableCell>
                            <StyledTableCell align='center'>STT</StyledTableCell>
                            <StyledTableCell>Họ và Tên</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Số điện thoại</StyledTableCell>
                            <StyledTableCell>Kỹ năng</StyledTableCell>                          
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => {
                            const isItemSelected = isSelected(row.id);
                            return (
                                <StyledTableRow
                                    key={row.id}
                                    hover
                                    onClick={(event) => handleSelectRow(event, row.id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                >
                                    <StyledTableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${row.id}` }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align='center'>
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                    <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                                    <StyledTableCell>
                                        {row.skill.map((skill, index) => (
                                            <span
                                                key={index}
                                                onMouseEnter={(e) => handlePopoverOpen(e, skill)}
                                                onMouseLeave={handlePopoverClose}
                                                style={{ marginRight: 8, cursor: 'pointer' }}
                                            >
                                                {skill === 'Coding' && <CodeIcon />}
                                                {skill === 'Design' && <DesignServicesIcon />}
                                                {skill === 'Project Management' && <StarIcon />}
                                            </span>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
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
                // onClose={handleCloseEditModal}
                openEditModal={openEditModal}
                setOpenEditModal={setOpenEditModal}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={openPopover}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <div style={{ padding: '8px', fontSize: '16px' }}>{popoverContent}</div>
            </Popover>
        </div>
    );
};

export default Table2;

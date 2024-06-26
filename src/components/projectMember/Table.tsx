'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Avatar, TablePagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import MemberInfoModal from './MemberInfoModal';
import "@/styles/accountManagement/DataTable.css";
import { ProjectMemberListResType, ProjectMemberType } from '@/schemaValidations/projectMember/projectMember.schema';

const StyledCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
  },
}));

const CenteredAvatarCell = styled(TableCell)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));
export interface FormFilter {
  "user-name": string,
  "student-code": string,
  semester: string,
  university: string,
}

function TableProjectMember({
  isFilter,
  dataFilter,
  cardMem
}: {
  isFilter: boolean;
  dataFilter: FormFilter | null;
  cardMem: ProjectMemberListResType | null;
}) {
  const [selectedMember, setSelectedMember] = React.useState<ProjectMemberType | null>(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // confirm Delete
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setLoading(true);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (member: ProjectMemberType) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  const handleDelete = (member: ProjectMemberListResType["data"][0]) => {
    //setSelectedMember({ status: 204, data: [member] });
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedMember) {
      setConfirmOpen(false);
      handleClose();
    }
  };

  const cancelDelete = () => {
    setOpen(false);
    setSelectedMember(null);
    setConfirmOpen(false);
  };

  return (
    <Box sx={{ width: '115.5%' }}>
      {/* <Typography variant='h4'>Thành viên dự án</Typography> */}
      {/* <ScrollArea className="h-[350px] rounded-md border p-4 mt-3"> */}
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }} component={Paper}>
        <Table sx={{ minWidth: 640 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledCell>Avatar</StyledCell>
              <StyledCell>Tên Thành Viên</StyledCell>
              <StyledCell>Mã số sinh viên</StyledCell>
              <StyledCell>Kỳ thực tập</StyledCell>
              <StyledCell>Kỹ năng công nghệ</StyledCell>
              <StyledCell>Hành động</StyledCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cardMem?.data.map((member) => (
              <StyledRow key={member.id}>
                <CenteredAvatarCell>
                  <Avatar
                    //alt={`Avatar of ${row.internID}`}
                    //src={row.avatarUrl}
                    sx={{ width: 45, height: 45 }}
                  />
                </CenteredAvatarCell>
                <StyledCell>{member['user-name']}</StyledCell>
                <StyledCell>{member['student-code']}</StyledCell>
                <StyledCell>{member['ojt-semester-university']}</StyledCell>
                <StyledCell>{member.technical_skills}</StyledCell>

                <StyledCell>
                  <Button size='small' onClick={() => handleClickOpen(member)}>Click</Button>
                </StyledCell>
              </StyledRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
       // count={cardMem?.paging.items || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="custom-row custom-pagination"
      />
      {/* </ScrollArea> */}

      {/* Thông tin từng trong card */}
      <MemberInfoModal
        open={open}
        handleClose={handleClose}
        selectedMember={selectedMember}
        handleDelete={handleDelete}
      />

      {/* Xác nhận xóa */}
      <Dialog
        open={confirmOpen}
        onClose={cancelDelete}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa thành viên này không?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TableProjectMember;
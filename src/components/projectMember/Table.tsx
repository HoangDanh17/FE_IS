'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { ScrollArea } from "@/components/ui/scroll-area"
import MemberInfoModal from './MemberInfoModal';
import "@/styles/accountManagement/DataTable.css";
import { ProjectMemberListResType } from '@/schemaValidations/projectMember/projectMember.schema';


function TableProjectMember({
  cardMem
}: {
  cardMem: ProjectMemberListResType
}) {
  const [selectedMember, setSelectedMember] = React.useState<ProjectMemberListResType | null>(null);
  const [open, setOpen] = React.useState(false);

  // confirm Delete
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleClickOpen = (member: ProjectMemberListResType) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  // const handleEdit = (member: ProjectMemberListResType) => {
  //   console.log("Edit member:", member);
  //   // Implement your edit logic here
  // };

  const handleDelete = (member: ProjectMemberListResType) => {
    setSelectedMember(member);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedMember) {
      setConfirmOpen(false);
      handleClose();
    }
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <Typography variant='h4'>Thành viên dự án</Typography>
      <ScrollArea className="h-[350px] rounded-md border p-4 mt-3">
        <Grid container spacing={2}>
          {cardMem?.data && cardMem.data.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card
                style={{
                  boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.2)",
                }}
                elevation={10}
                variant="outlined"
                className="w-[330px] hover:scale-110 duration-300"
                onClick={() => handleClickOpen(member)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      //alt={`Avatar of ${row.internID}`}
                      //src={row.avatarUrl}
                      sx={{ width: 56, height: 56, marginRight: 2 }}
                    />

                    <Box>
                      <Typography variant="body1">
                        Tên Thành Viên: {member['user-name']}
                      </Typography>

                      <Typography variant="body1">
                        Mã số sinh viên: {member['student-code']}
                      </Typography>

                      <Typography variant="body1">
                        Kỳ thực tập: {member['ojt-semester-university']}
                      </Typography>

                      {/* <Chip style={{ marginTop: "10px" }} size="small" label="in progress" /> */}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ScrollArea>

      {/* Thông tin từng trong card */}
      <MemberInfoModal
        open={open}
        handleClose={handleClose}
        selectedMember={selectedMember}
        // handleEdit={handleEdit}
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
    </div>
  );
}

export default TableProjectMember;
import React from 'react';
import { Modal, Button, Typography, FormControl, Grid, TextField, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '@/styles/projectMember/InfoModal.css';

interface MemberInfoModalProps {
    open: boolean;
    handleClose: () => void;
    selectedMember: {
        idAccount: string;
        userName: string;
        email: string;
        role: string;
        createDate: string;
    } | null;
    handleEdit: (member: any) => void;
    handleDelete: (member: any) => void;
}

const MemberInfoModal: React.FC<MemberInfoModalProps> = ({ open, handleClose, selectedMember, handleDelete, handleEdit }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="modal-detail-box">
                {selectedMember && (
                    <FormControl>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Thông tin thành viên
                        </Typography>

                        <Grid container spacing={2} marginY={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Tên người dùng"
                                        value={selectedMember.userName}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Email"
                                        value={selectedMember.email}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Role"
                                        value={selectedMember.role}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Ngày tạo"
                                        value={selectedMember.createDate}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                variant='contained'
                                onClick={() => handleEdit(selectedMember)}
                                color="warning"
                                startIcon={<EditIcon />}
                                style={{marginRight: "5px"}}
                            >
                                Sửa
                            </Button>

                            <Button
                                variant='contained'
                                onClick={() => handleDelete(selectedMember)}
                                color="error"
                                startIcon={<DeleteIcon />}
                            >
                                Xóa
                            </Button>
                        </Box>
                    </FormControl>
                )}
            </Box>
        </Modal>
    );
}

export default MemberInfoModal;

import React from 'react';
import { Modal, Button, Typography, FormControl, Grid, Avatar, AvatarGroup, Tooltip, Chip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '@/styles/projectMember/InfoModal.css';
import { ProjectMemberListResType } from '@/schemaValidations/projectMember/projectMember.schema';

interface MemberInfoModalProps {
    open: boolean;
    handleClose: () => void;
    selectedMember: any;
    handleDelete: (member: any) => void;
}

const MemberInfoModal: React.FC<MemberInfoModalProps> = ({ open, handleClose, selectedMember, handleDelete }) => {
    const [listImage, setListImage] = React.useState<ProjectMemberListResType>();

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="modal-detail-box">
                {selectedMember && (
                    <FormControl>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Thông tin thành viên
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Avatar src={selectedMember.avatar} className="centered-avatar" />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Tên: <Typography component="span" fontWeight="bold"> {selectedMember['user-name']}</Typography>
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    MSSV: <Typography component="span" fontWeight="bold"> {selectedMember['student-code']}</Typography>
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Kỳ OJT: <Typography component="span" fontWeight="bold"> {selectedMember['ojt-semester-university']}</Typography>
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Kỹ năng công nghệ: <Typography component="span" fontWeight="bold"> {selectedMember.technical_skills}</Typography>
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Trạng thái: <Chip label={selectedMember.status} color="success" />
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button
                                        variant='contained'
                                        onClick={() => handleDelete(selectedMember)}
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                    >
                                        Dừng hoạt động
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </FormControl>
                )}
            </div>
        </Modal>
    );
}

export default MemberInfoModal;
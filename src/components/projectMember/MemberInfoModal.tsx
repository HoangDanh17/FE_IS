import React from 'react';
import { Modal, Button, Typography, FormControl, Grid, TextField, Box, Avatar, AvatarGroup, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '@/styles/projectMember/InfoModal.css';
import { ProjectMemberListResType } from '@/schemaValidations/projectMember/projectMember.schema';
interface MemberInfoModalProps {
    open: boolean;
    handleClose: () => void;
    selectedMember: {
        id: string,
        "user-name": string,
        "student-code": string,
        avatar: string,
        "ojt-semester-university": string,
        "technical_skills": string,
    } | null;
    // handleEdit: (member: any) => void;
    handleDelete: (member: any) => void;
    listImage: ProjectMemberListResType
}

const MemberInfoModal: React.FC<MemberInfoModalProps> = ({ open, handleClose, selectedMember, handleDelete, listImage }) => {
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
                                        value={selectedMember['user-name']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Mã sinh viên"
                                        value={selectedMember['student-code']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Kỳ OJT"
                                        value={selectedMember['ojt-semester-university']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Kỹ năng công nghệ"
                                        value={selectedMember.technical_skills}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                                        <Typography variant="h6">Hình ảnh </Typography>
                                        <AvatarGroup>
                                            {/* {listImage?.data.map((image, index) => ( */}
                                            <Tooltip title="tam">
                                                <Avatar
                                                    //alt={image['user-name']}
                                                    src="/images/avatar.jpg"
                                                />
                                            </Tooltip>
                                            {/* ))} */}
                                        </AvatarGroup>
                                    </Box>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box display="flex" justifyContent="flex-end">
                            {/* <Button
                                variant='contained'
                                onClick={() => handleEdit(selectedMember)}
                                color="warning"
                                startIcon={<EditIcon />}
                                style={{ marginRight: "5px" }}
                            >
                                Sửa
                            </Button> */}

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

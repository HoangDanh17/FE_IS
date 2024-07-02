import React from 'react';
import { Modal, Button, Typography, FormControl, Grid, TextField, Box, Avatar, AvatarGroup, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '@/styles/projectMember/InfoModal.css';
import { ProjectMemberListResType } from '@/schemaValidations/projectMember/projectMember.schema';
interface MemberInfoModalProps {
    open: boolean;
    handleClose: () => void;
    selectedMember: any;
    // handleEdit: (member: any) => void;
    handleDelete: (member: any) => void;
    // listImage: ProjectMemberListResType
}

const MemberInfoModal: React.FC<MemberInfoModalProps> = ({ open, handleClose, selectedMember, handleDelete }) => {
    const [listImage, setListImage] = React.useState<ProjectMemberListResType>();

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
                                    <Typography variant="subtitle1">
                                        Tên: <Typography component="span" variant="subtitle1" fontWeight="bold"> {selectedMember['user-name']}</Typography>
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle1">
                                        MSSV: <Typography component="span" variant="subtitle1" fontWeight="bold"> {selectedMember['student-code']}</Typography>
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle1">
                                        Kỳ OJT: <Typography component="span" variant="subtitle1" fontWeight="bold"> {selectedMember['ojt-semester-university']}</Typography>
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle1">
                                        Kỹ năng công nghệ: <Typography component="span" variant="subtitle1" fontWeight="bold"> {selectedMember.technical_skills}</Typography>
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                                        <Typography variant="h6">Hình ảnh </Typography>
                                        <AvatarGroup>
                                            {/* {listImage?.data.map((image, index) => ( */}
                                            <Tooltip title={selectedMember['user-name']}>
                                                <Avatar
                                                    //alt={image['user-name']}
                                                    src={selectedMember.avatar}
                                                />
                                            </Tooltip>
                                            {/* ))} */}
                                        </AvatarGroup>
                                    </Box>
                                </FormControl>
                            </Grid>
                        </Grid>

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
                    </FormControl>
                )}
            </Box>
        </Modal>
    );
}

export default MemberInfoModal;

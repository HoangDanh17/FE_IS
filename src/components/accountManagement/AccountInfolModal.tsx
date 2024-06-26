import React from 'react';
import { Modal, Typography, Box, TextField, Grid, FormControl } from '@mui/material';
import "@/styles/accountManagement/ModalBox.css"
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    handleClose: () => void;
    selectedRow: any;
}

const AccountInfolModal: React.FC<DetailModalProps> = ({ open, handleClose, selectedRow }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <div className='modal-detail-box'>
                {selectedRow && (
                    <FormControl>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Thông tin tài khoản
                        </Typography>
                        <Grid container spacing={2} marginY={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle1">
                                        Tên người dùng: <Typography component="span" variant="subtitle1" fontWeight="bold"> {selectedRow['user-name']}</Typography>
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle1">
                                        Email: <Typography component="span" variant="subtitle1" fontWeight="bold"> {selectedRow.email}</Typography>
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle1">
                                        Role: <Typography component="span" variant="subtitle1" fontWeight="bold"> {selectedRow.role}</Typography>
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                   

                                    <Typography variant="subtitle1">
                                        Ngày tạo: <Typography component="span" variant="subtitle1" fontWeight="bold"> {dayjs(selectedRow['created-at']).format("DD/MM/YYYY")}</Typography>
                                    </Typography>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </FormControl>
                )}
            </div>
        </Modal>
    );
};

export default AccountInfolModal;

import React from 'react';
import { Modal, Typography, Box, TextField, Grid, FormControl, Button } from '@mui/material';
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
                                    <TextField
                                        label="Tên người dùng"
                                        value={selectedRow["user-name"]}
                                        InputProps={{ readOnly: true }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Email"
                                        value={selectedRow.email}
                                        InputProps={{ readOnly: true }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Role"
                                        value={selectedRow.role}
                                        InputProps={{ readOnly: true }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Ngày tạo"
                                        value={dayjs(selectedRow['created-at']).format("DD/MM/YYYY")}
                                        InputProps={{ readOnly: true }}
                                    />
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

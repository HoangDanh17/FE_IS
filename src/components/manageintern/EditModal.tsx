import React from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl, Modal } from "@mui/material"
import '@/components/css/manageintern/ModalBox.css'


interface EditModalProps {
    onClose: () => void;
    openEditModal: boolean;
    setOpenEditModal: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: any;
}

const EditModal = (props: EditModalProps) => {

    const {
        openEditModal, setOpenEditModal, dataUpdate, setDataUpdate, onClose
    } = props;

    return (
        <Modal
            open={openEditModal}
            //onClose={handleCloseAddModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal-box">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Thêm tài khoản mới
                </Typography>

                <FormControl>
                    <Grid container spacing={2} marginY={2}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Họ và Tên"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Email"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Mật khẩu"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Kỹ năng"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            color="primary"
                            className="cancel-btn"
                            onClick={onclose}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Add
                        </Button>
                    </Box>
                </FormControl>
            </Box>
        </Modal>
    )
}
export default EditModal;
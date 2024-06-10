import React from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl } from "@mui/material"
import '@/styles/accountManagement/ModalBox.css'


interface AddModalProps {
    onClose: () => void;
}

const AddModalAccount: React.FC<AddModalProps> = ({onClose}) => {
    return (
        <Box className="modal-add-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Thêm tài khoản mới
            </Typography>

            <FormControl>
                <Grid container spacing={2} marginY={2}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="Tên người dùng"
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
                                label="Role"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="flex-end">
                    <Button
                        color="primary"
                        className="cancel-btn"
                        onClick={onClose}
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
    )
}
export default AddModalAccount;
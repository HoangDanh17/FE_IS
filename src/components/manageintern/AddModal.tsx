'use client';
import React from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl } from "@mui/material"
import '@/components/css/manageintern/ModalBox.css'


const AddModal = () => {
    return (
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
                                label="Số điện thoại"
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
export default AddModal;
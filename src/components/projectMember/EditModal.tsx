import React from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl } from "@mui/material"
import '@/styles/accountManagement/ModalBox.css'


interface AddModalProps {
    onClose: () => void;
}

const EditModalMemberProject: React.FC<AddModalProps> = ({onClose}) => {
    return (
        <Box className="modal-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Cập nhật thông tin
            </Typography>

            <FormControl>
                <Grid container spacing={2} marginY={2}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="ID dự án"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="ID thành viên"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="Ngày tham gia"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="Trạng thái"
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
export default EditModalMemberProject;
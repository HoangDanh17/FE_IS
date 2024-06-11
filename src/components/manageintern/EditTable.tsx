import React from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl } from "@mui/material";
import '@/components/css/manageintern/ModalBox.css';

interface EditModalProps {
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ onClose, onEdit, onDelete }) => {
    return (
        <Box className="modal-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Information
            </Typography>

            <FormControl>
                <Grid container spacing={2} marginY={2}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="Họ và tên"
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
                        color="primary"
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onEdit}
                    >
                        Edit
                    </Button>                 
                </Box>
            </FormControl>
        </Box>
    )
}
export default EditModal;
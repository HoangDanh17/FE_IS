import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl } from "@mui/material";
import '@/components/css/manageintern/ModalBox.css';

interface AddModalProps {
    onAdd: (data: any) => void;
    onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onAdd, onClose }) => {
    const [formData, setFormData] = useState({
        semester: '',
        university: '',
        start_date: '',
        end_date: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = () => {
        onAdd(formData);
        onClose();
    };

    return (
        <Box className="modal-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Thêm kì học mới
            </Typography>

            <FormControl>
                <Grid container spacing={2} marginY={2}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="Kì"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="Trường"
                                name="university"
                                value={formData.university}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="Start Date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="End Date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
};

export default AddModal;

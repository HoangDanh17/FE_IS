'use client';
import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl } from "@mui/material";
import '@/components/css/manageintern/ModalBox.css';

interface RowData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  skill: string[];
}

interface EditModalProps {
  rowData: RowData | null;
}

const EditModal: React.FC<EditModalProps> = ({ rowData }) => {
  const [formData, setFormData] = useState<RowData>({
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    skill: []
  });

  useEffect(() => {
    if (rowData) {
      setFormData(rowData); // Initialize form data with the selected row data
    }
  }, [rowData]);

  const handleChange = (field: keyof RowData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      skill: event.target.value.split(',').map(skill => skill.trim()),
    });
  };

  const handleSubmit = () => {
    console.log(formData); // Log the updated form data to the console
  };

  return (
    <div>           
      <Box className="modal-box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Sửa tài khoản
        </Typography>

        <FormControl>
          <Grid container spacing={2} marginY={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  label="Họ và Tên"
                  value={formData.name}
                  onChange={handleChange('name')}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  value={formData.email}
                  onChange={handleChange('email')}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  label="Số điện thoại"
                  value={formData.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  label="Kỹ năng"
                  value={formData.skill.join(', ')}
                  onChange={handleSkillChange}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Edit
            </Button>
          </Box>
        </FormControl>
      </Box>
    </div>
  );
};

export default EditModal;

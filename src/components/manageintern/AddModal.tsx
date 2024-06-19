import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';
import '@/components/css/manageintern/ModalBox.css';
import { useRouter } from 'next/navigation';

import { toast } from '../ui/use-toast';
import internApiRequest from '@/apiRequests/intern';
import { CreateInternType } from '@/schemaValidations/intern.schema';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<CreateInternType>({
    address: '',
  avatar: '',
  "date-of-birth": '',
  email: '',
  gender: '',
  "ojt-id": '',
  password: '',
  "phone-number": '',
  "student-code": '',
  "user-name": '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name: string, date: Dayjs | null) => {
    setFormData({
      ...formData,
      [name]: date ? date.format('YYYY-MM-DD') : '',
    });
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAdd() {
    setLoading(true);
    const formattedData = {
      ...formData,
      "date-of-birth": formData["date-of-birth"] ? dayjs(formData["date-of-birth"]).format('YYYY-MM-DD') : '',
    };
    console.log("Form Data:", formattedData);
    try {
      const result = await internApiRequest.createIntern(formattedData);
      toast({
        title: result.payload.message,
        duration: 2000,
        variant: "success",
      });
      console.log(result);
      router.refresh();
    } catch (error: any) {
      toast({
        title: error.message,
        duration: 2000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="modal-box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm thực tập sinh mới
        </Typography>
        <FormControl>
          <Grid container spacing={2} marginY={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="user-name"
                value={formData['user-name']}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>            
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Mã sinh viên"
                name="student-code"
                value={formData['student-code']}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Mã OJT"
                name="ojt-id"
                value={formData['ojt-id']}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Giới tính"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone-number"
                value={formData['phone-number']}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <DatePicker
                label="Ngày sinh"
                value={dayjs(formData["date-of-birth"])}
                onChange={(date) => handleDateChange('date-of-birth', date)}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </Box>
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
};

export default AddModal;

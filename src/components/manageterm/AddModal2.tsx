import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';
import '@/components/css/manageintern/ModalBox.css';
import { CreateTermType } from '@/schemaValidations/term.schema';
import { useRouter } from 'next/navigation';
import termApiRequest from '@/apiRequests/term';
import { toast } from '../ui/use-toast';

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<CreateTermType>({
    semester: '',
    university: '',
    "start-at": '',  
    "end-at": '',    
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
      [name]: date ? date.toISOString() : '',
    });
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdd = async () => {
    setLoading(true);
    const formattedData = {
      ...formData,
      "start-at": formData["start-at"] ? dayjs(formData["start-at"]).format('YYYY-MM-DD') : '',
      "end-at": formData["end-at"] ? dayjs(formData["end-at"]).format('YYYY-MM-DD') : '',
    };
    console.log("Form Data:", formattedData);
    try {
      const result = await termApiRequest.createTerm(formattedData);
      toast({
        title: `${result.payload.message}`,
        duration: 2000,
        variant: "success",
      });
      console.log(result);
      router.refresh();
    } catch (error: any) {
      toast({
        title: `${error.message}`,
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
          Thêm kì học mới
        </Typography>

        <FormControl>
          <Grid container spacing={2} marginY={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Kì"
                  name="semester"
                  size='small'
                  value={formData.semester}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Trường"
                  size='small'
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <DatePicker
                  label="Start Date"
                  value={formData["start-at"] ? dayjs(formData["start-at"]) : null}
                  onChange={(date) => handleDateChange('start-at', date)}
                  slotProps={{ textField: { fullWidth: true, size: "small" } }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <DatePicker
                  label="End Date"
                  value={formData["end-at"] ? dayjs(formData["end-at"]) : null}
                  onChange={(date) => handleDateChange('end-at', date)}
                  slotProps={{ textField: { fullWidth: true, size: "small" } }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
              {loading ? "Loading..." : "Add"}
            </Button>
          </Box>
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
};

export default AddModal;

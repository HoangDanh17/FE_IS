"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
  FormHelperText,
} from "@mui/material";
import "@/components/css/manageintern/ModalBox.css";
import { RowData2 } from "./TermTable";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UpdateTermType } from "@/schemaValidations/term.schema";
import termApiRequest from "@/apiRequests/term";
import { toast } from "../ui/use-toast";

const EditModal = ({
  row,
  onClose,
}: {
  row: RowData2 | null | undefined;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<UpdateTermType>({
    id: row?.id || "",
    semester: row?.semester || "",
    university: row?.university || "",
    "start-at": row?.["start-at"] || "",
    "end-at": row?.["end-at"] || "",
  });

  const [errors, setErrors] = useState({
    semester: '',
    university: '',
    "start-at": '',
    "end-at": ''
  });

  const handleDateChange = (name: string, date: Dayjs | null) => {
    const newDate = date ? date.toISOString() : '';
    setFormData({
      ...formData,
      [name]: newDate,
    });

    if (name === 'start-at' && formData["end-at"]) {
      const isValid = !formData["end-at"] || dayjs(newDate).isBefore(dayjs(formData["end-at"]));
      setErrors({
        ...errors,
        "start-at": newDate ? '' : 'This field is required',
        "end-at": isValid ? '' : 'End date must be after start date'
      });
    } else if (name === 'end-at') {
      const isValid = !formData["start-at"] || dayjs(newDate).isAfter(dayjs(formData["start-at"]));
      setErrors({
        ...errors,
        "end-at": isValid ? '' : 'End date must be after start date'
      });
    } else {
      setErrors({
        ...errors,
        [name]: newDate ? '' : 'This field is required'
      });
    }
  };

  const handleChange = (name: keyof UpdateTermType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
    setErrors({
      ...errors,
      [name]: event.target.value ? '' : 'This field is required',
    });
  };

  const validateForm = () => {
    const newErrors = {
      semester: formData.semester ? '' : 'This field is required',
      university: formData.university ? '' : 'This field is required',
      "start-at": formData["start-at"] ? '' : 'This field is required',
      "end-at": formData["end-at"] ? '' : 'This field is required',
    };

    if (formData["start-at"] && formData["end-at"]) {
      newErrors["end-at"] = dayjs(formData["end-at"]).isAfter(dayjs(formData["start-at"]))
        ? ''
        : 'End date must be after start date';
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error);
  };

  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const formattedData = {
      ...formData,
      "start-at": formData["start-at"] ? dayjs(formData["start-at"]).format('YYYY-MM-DD') : '',
      "end-at": formData["end-at"] ? dayjs(formData["end-at"]).format('YYYY-MM-DD') : '',
    };
    console.log("Form Data:", formattedData);
    try {
      const result = await termApiRequest.updateTerm(formattedData);
      toast({
        title: `${result.payload.message}`,
        duration: 2000,
        variant: "success",
      });
      console.log(result);
    } catch (error: any) {
      toast({
        title: `${error}`,
        duration: 2000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sửa
          </Typography>

          <FormControl>
            <Grid container spacing={2} marginY={2}>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.semester}>
                  <TextField
                    label="Kì"
                    size="small"
                    value={formData.semester}
                    onChange={handleChange("semester")}
                    error={!!errors.semester}
                  />
                  {errors.semester && <FormHelperText>{errors.semester}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.university}>
                  <TextField
                    size="small"
                    label="Trường"
                    value={formData.university}
                    onChange={handleChange("university")}
                    error={!!errors.university}
                  />
                  {errors.university && <FormHelperText>{errors.university}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors["start-at"]}>
                  <DatePicker
                    label="Start Date"
                    value={formData["start-at"] ? dayjs(formData["start-at"]) : null}
                    onChange={(date) => handleDateChange('start-at', date)}
                    slotProps={{ textField: { fullWidth: true, size: "small", error: !!errors["start-at"] } }}
                  />
                  {errors["start-at"] && <FormHelperText>{errors["start-at"]}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors["end-at"]}>
                  <DatePicker
                    label="End Date"
                    value={formData["end-at"] ? dayjs(formData["end-at"]) : null}
                    onChange={(date) => handleDateChange('end-at', date)}
                    slotProps={{ textField: { fullWidth: true, size: "small", error: !!errors["end-at"] } }}
                  />
                  {errors["end-at"] && <FormHelperText>{errors["end-at"]}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleAdd} disabled={loading}>
                {loading ? "Loading..." : "Edit"}
              </Button>
            </Box>
          </FormControl>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default EditModal;

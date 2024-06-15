"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
} from "@mui/material";
import "@/components/css/manageintern/ModalBox.css";
import { RowData } from "./TermTable";

const defaultRowData: RowData = {
  id: "",
  semester: "",
  university: "",
  start_date: "",
  end_date: "",
};

const EditModal = ({
  row,
}: {
  row: RowData | null;
}) => {
  const [formData, setFormData] = useState<RowData | null>(defaultRowData);

  useEffect(() => {
    if (row) {
      setFormData(row); // Initialize form data with the selected row data
    }
  }, [row]);

  const handleChange =
    (field: keyof RowData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (formData) {
        setFormData({
          ...formData,
          [field]: event.target.value,
        });
      }
    };

  const handleSubmit = () => {
    if (formData) {
      console.log(formData); // Log the updated form data to the console
    }
  };

  return (
    <div>
      <Box className="modal-box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Sửa
        </Typography>

        <FormControl>
          <Grid container spacing={2} marginY={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  label="Kì"
                  value={formData?.semester || ""}
                  onChange={handleChange("semester")}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  label="Trường"
                  value={formData?.university || ""}
                  onChange={handleChange("university")}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  label="Ngày bắt đầu"
                  value={formData?.start_date || ""}
                  onChange={handleChange("start_date")}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  label="Ngày kết thúc"
                  value={formData?.end_date || ""}
                  onChange={handleChange("end_date")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Edit
            </Button>
          </Box>
        </FormControl>
      </Box>
    </div>
  );
};

export default EditModal;

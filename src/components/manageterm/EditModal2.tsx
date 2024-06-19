"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
} from "@mui/material";
import "@/components/css/manageintern/ModalBox.css";
import { RowData2 } from "./TermTable";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UpdateTermType } from "@/schemaValidations/term.schema";

import termApiRequest from "@/apiRequests/term";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";


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

  const handleDateChange = (name: string, date: Dayjs | null) => {
    setFormData({
      ...formData,
      [name]: date ? date.toISOString() : "",
    });
  };

  const handleChange = (name: keyof UpdateTermType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAdd() {
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
      router.refresh();
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
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Kì"
                    value={formData.semester}
                    onChange={handleChange("semester")}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Trường"
                    value={formData.university}
                    onChange={handleChange("university")}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <DatePicker
                    label="Start Date"
                    value={formData["start-at"] ? dayjs(formData["start-at"]) : null}
                    onChange={(date) => handleDateChange('start-at', date)}
                    slotProps={{ textField: { fullWidth: true, size: "small" } }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
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
              <Button variant="contained" color="primary" onClick={handleAdd} disabled={loading}>
                Edit
              </Button>
            </Box>
          </FormControl>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default EditModal;

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
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UpdateTermType } from "@/schemaValidations/term.schema";

import termApiRequest from "@/apiRequests/term";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { FormFilterData } from "./InternTable";
import {
  InternSchemaType,
  UpdateInternType,
} from "@/schemaValidations/intern.schema";
import internApiRequest from "@/apiRequests/intern";

const EditModal = ({
  row,
  onClose,
}: {
  row: InternSchemaType | null;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<UpdateInternType>({
    "account-id": row?.["account-id"],
    "intern-id": row?.["intern-id"],
    "user-name": row?.["user-name"],
    email: row?.email,
    "student-code": row?.["student-code"],
    avatar: row?.avatar,
    gender: row?.gender,
    "date-of-birth": row?.["date-of-birth"],
    "phone-number": row?.["phone-number"],
    address: row?.address,
    "ojt-semester": row?.["ojt-semester"],
  });

  const handleDateChange = (name: string, date: Dayjs | null) => {
    setFormData({
      ...formData,
      [name]: date ? date.toISOString() : "",
    });
  };

  const handleChange =
    (name: keyof UpdateInternType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [name]: event.target.value,
      });
    };

  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    const formattedData = {
      ...formData,
      "ojt-id": 1,
    };
    delete formattedData["ojt-semester"];
    console.log("Form Data:", formattedData);
    try {
      const result = await internApiRequest.updateIntern(formattedData);
      toast({
        title: `${result.payload.message}`,
        duration: 2000,
        variant: "success",
      });
      console.log(result);
      onClose();
    } catch (error: any) {
      toast({
        title: `${error}`,
        duration: 2000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

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
                    label="Username"
                    value={formData["user-name"]}
                    onChange={handleChange("user-name")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    value={formData.email}
                    onChange={handleChange("email")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Mã sinh viên"
                    value={formData["student-code"]}
                    onChange={handleChange("student-code")}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Mã OJT"
                    value={formData["ojt-semester"]}
                    onChange={handleChange("ojt-semester")}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Số điện thoại"
                    value={formData["phone-number"]}
                    onChange={handleChange("phone-number")}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Địa chỉ"
                    value={formData.address}
                    onChange={handleChange("address")}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Avatar"
                    value={formData.avatar}
                    onChange={handleChange("avatar")}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <DatePicker
                    label="Ngày sinh"
                    value={
                      formData["date-of-birth"]
                        ? dayjs(formData["date-of-birth"])
                        : null
                    }
                    onChange={(date) => handleDateChange("date-of-birth", date)}
                    slotProps={{
                      textField: { fullWidth: true, size: "small" },
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </FormControl>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={loading}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default EditModal;

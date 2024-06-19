"use client";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import ListTimeTable from "@/components/timeTable/ListTimeTable";

const FilterTimeTable = ({ selectedDay }: { selectedDay: Dayjs | null }) => {
  const [status, setStatus] = useState("all");

  const handleStatusChange = (event: any) => {
    const { value } = event.target;
    setStatus(value);
    console.log("Status changed to:", value);
  };

  useEffect(() => {
    if (selectedDay) {
      console.log("Selected day is:", selectedDay.format("YYYY-MM-DD"));
    }
  }, [selectedDay]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl margin="normal" style={{ minWidth: 200 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            size="small"
            name="status"
            value={status}
            onChange={handleStatusChange}
            label="Status"
            defaultValue=""
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="denied">Denied</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ListTimeTable status={status} selectedDay={selectedDay} />
    </LocalizationProvider>
  );
};

export default FilterTimeTable;

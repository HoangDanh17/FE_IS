"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import FilterTimeTable from "@/components/timeTable/FilterTimeTable";

const daysOfWeek = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
];

const defaultData = {
  approved: 10,
  pending: 5,
  canceled: 2,
};

const TimeTable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [selectedDayName, setSelectedDayName] = useState<string>("");

  const startOfWeek = selectedDate?.startOf("week").add(1, "day"); // Ensure the week starts on Monday
  const currentWeekDates = daysOfWeek.map((_, index) =>
    startOfWeek?.add(index, "day")
  );

  const handleCardClick = (date: Dayjs | undefined, day: string) => {
    if (date) {
      setSelectedDay(date);
      setSelectedDayName(day);
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <Typography variant="h4" component="div" sx={{ mr: 2 }}>
            Lịch làm việc của tuần này
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="space-between">
          {daysOfWeek.map((day, index) => (
            <Grid item xs={12 / 7} key={day}>
              <Card
                onClick={() => handleCardClick(currentWeekDates[index], day)}
                sx={{
                  cursor: "pointer",
                  width: 150,
                  height: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
                    {day}
                  </Typography>
                  {currentWeekDates && currentWeekDates[index] && (
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: "center" }}>
                      {currentWeekDates[index]?.format("DD/MM/YYYY")}
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'green', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Đã duyệt: {defaultData.approved}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'orange', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Chờ duyệt: {defaultData.pending}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'red', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Hủy: {defaultData.canceled}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          maxWidth="xl"
        >
          <DialogTitle id="dialog-title">
            Chi tiết lich ngày: {selectedDayName},{selectedDay ? selectedDay.format("DD/MM/YYYY") : ""}
          </DialogTitle>
          <DialogContent>
            <FilterTimeTable selectedDay={selectedDay}></FilterTimeTable>
          </DialogContent>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default TimeTable;

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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
  styled,
  tableCellClasses,
  Tooltip,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import FilterTimeTable from "@/components/timeTable/FilterTimeTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TimeTableResType,
  TimeTableType,
} from "@/schemaValidations/timetable.schema";
import timetableApiRequest from "@/apiRequests/timetable";

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

const dummyData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    dateInOffice: "2024-06-20",
    status: "Đã duyệt",
    actualArrivalTime: "08:30",
    actualDepartureTime: "17:00",
    scheduledArrivalTime: "08:00",
    scheduledDepartureTime: "17:30",
    internshipCode: "TPS001",
  },
  {
    id: 2,
    name: "Trần Thị B",
    dateInOffice: "2024-06-21",
    status: "Chờ duyệt",
    actualArrivalTime: "09:00",
    actualDepartureTime: "16:30",
    scheduledArrivalTime: "09:30",
    scheduledDepartureTime: "17:00",
    internshipCode: "TPS002",
  },
  {
    id: 3,
    name: "Lê Văn C",
    dateInOffice: "2024-06-22",
    status: "Hủy",
    actualArrivalTime: "08:45",
    actualDepartureTime: "16:45",
    scheduledArrivalTime: "08:30",
    scheduledDepartureTime: "17:00",
    internshipCode: "TPS003",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TimeTable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [selectedDayName, setSelectedDayName] = useState<string>("");
  const [filterDate, setFilterDate] = useState<Dayjs | null>(null); // Thêm state mới cho DatePicker lọc
  const [data, setData] = useState<TimeTableResType | undefined>();

  const handleFilterDateChange = (newValue: Dayjs | null) => {
    setFilterDate(newValue);
    const body = {
      "office-time-from": dayjs(newValue).format("YYYY-MM-DD"),
      "office-time-to": dayjs(newValue).format("YYYY-MM-DD"),
    };
    timetableApiRequest.getTimeTable(body).then((payload) => {
      setData(payload.payload);
    });
    console.log(
      "Ngày được chọn từ DatePicker lọc:",
      newValue ? newValue.format("DD/MM/YYYY") : null
    );
  };

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
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <Typography variant="h4" component="div" sx={{ mr: 2 }}>
            Lịch làm việc của tuần này
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="space-between">
          {daysOfWeek.map((day, index) => (
            <Grid item xs={12 / 7} key={day}>
              <Tooltip title="Ấn để xem chi tiết" arrow placement="top">
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
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ textAlign: "center" }}
                    >
                      {day}
                    </Typography>
                    {currentWeekDates && currentWeekDates[index] && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ textAlign: "center" }}
                      >
                        {currentWeekDates[index]?.format("DD/MM/YYYY")}
                      </Typography>
                    )}
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "green",
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Đã duyệt: {defaultData.approved}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "orange",
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Chờ duyệt: {defaultData.pending}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "red",
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Hủy: {defaultData.canceled}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
        {/*  */}
        <Box sx={{ mb: 4, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h4" component="div" sx={{ mr: 2, mt: 2 }}>
              Lịch sử làm việc
            </Typography>
            <Typography variant="h4" component="div" sx={{ mr: 2, mt: 2 }}>
              -
            </Typography>
            <DatePicker
              value={filterDate}
              onChange={(newValue) => handleFilterDateChange(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                  style: { marginTop: 10, backgroundColor: "white" },
                },
              }}
            />
          </Box>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <ScrollArea className="h-[240px]">
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Tên thực tập</StyledTableCell>
                    <StyledTableCell>Mã thực tập sinh</StyledTableCell>
                    <StyledTableCell>Trạng thái</StyledTableCell>
                    <StyledTableCell>Giờ đến (thực tế)</StyledTableCell>
                    <StyledTableCell>Giờ về (thực tế)</StyledTableCell>
                    <StyledTableCell>Giờ đến (lịch)</StyledTableCell>
                    <StyledTableCell>Giờ về (lịch)</StyledTableCell>
                    <StyledTableCell>Ngày lên văn phòng</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.data.length > 0 ? (
                    data.data.map((intern) => (
                      <StyledTableRow key={intern.id}>
                        <StyledTableCell>{intern.intern_name}</StyledTableCell>
                        <StyledTableCell>{intern["student-code"]}</StyledTableCell>
                        <StyledTableCell>{intern.status}</StyledTableCell>
                        <StyledTableCell>{intern["act-start"]}</StyledTableCell>
                        <StyledTableCell>{intern["act-end"]}</StyledTableCell>
                        <StyledTableCell>{intern["est-start"]}</StyledTableCell>
                        <StyledTableCell>{intern["est-end"]}</StyledTableCell>
                        <StyledTableCell>{intern["office-time"]}</StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell colSpan={8} align="center">
                        Chọn ngày để xem lịch sử
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </TableContainer>
        </Box>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          maxWidth="xl"
        >
          <DialogTitle id="dialog-title">
            Chi tiết lich ngày: {selectedDayName},
            {selectedDay ? selectedDay.format("DD/MM/YYYY") : ""}
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

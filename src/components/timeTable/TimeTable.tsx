"use client";
import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
  tableCellClasses,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import FilterTimeTable from "@/components/timeTable/FilterTimeTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TimeTableResType,
  TimeTableType,
  WeekResType,
} from "@/schemaValidations/timetable.schema";
import timetableApiRequest from "@/apiRequests/timetable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>();
  const [selectedDayName, setSelectedDayName] = useState<string>("");
  const [filterDate, setFilterDate] = useState<Dayjs | null>(null); // Thêm state mới cho DatePicker lọc
  const [data, setData] = useState<TimeTableResType | undefined>();
  const [dataWeek, setDataWeek] = useState<WeekResType>();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { payload } = await timetableApiRequest.getCurrentWeek();
        setDataWeek(payload);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refreshKey]);

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

  const handleCardClick = (date: string | Date | null, day: string) => {
    if (date) {
      setSelectedDay(dayjs(date));
      setSelectedDayName(day);
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setRefreshKey((prevKey) => prevKey + 1);
    setFilterDate(null);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    internId: string
  ) => {
    const { value } = event.target;
    // Logic to update status or handle submission
    console.log(`Intern ID ${internId} status updated to: ${value}`);
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
          {dataWeek?.data.map((day, index) => (
            <Grid item xs={12 / 7} key={index}>
              <Card
                onClick={() => handleCardClick(day.date, day["week-day"])}
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
                    {day["week-day"]}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "center" }}
                  >
                    {dayjs(day.date).format("DD/MM/YYYY")}
                  </Typography>
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
                      Đã duyệt: {day["total-approved"]}
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
                      Đang chờ: {day["total-waiting"]}
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
                      Từ chối: {day["total-denied"]}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
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
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>Tên thực tập</StyledTableCell>
                    <StyledTableCell>Mã thực tập sinh</StyledTableCell>
                    <StyledTableCell>Trạng thái</StyledTableCell>
                    <StyledTableCell>Giờ đến (thực tế)</StyledTableCell>
                    <StyledTableCell>Giờ về (thực tế)</StyledTableCell>
                    <StyledTableCell>Giờ đến (lịch)</StyledTableCell>
                    <StyledTableCell>Giờ về (lịch)</StyledTableCell>
                    <StyledTableCell>Ngày lên văn phòng</StyledTableCell>
                    {/* <StyledTableCell>Trạng thái điểm danh</StyledTableCell>
                    <StyledTableCell>Chỉnh sửa thái điểm danh</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.data.length > 0 ? (
                    data.data.map((intern, index) => (
                      <StyledTableRow key={intern.id}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{intern.intern_name}</StyledTableCell>
                        <StyledTableCell>
                          {intern["student-code"]}
                        </StyledTableCell>
                        <StyledTableCell>{intern.status}</StyledTableCell>
                        <StyledTableCell>{intern["act-start"]}</StyledTableCell>
                        <StyledTableCell>{intern["act-end"]}</StyledTableCell>
                        <StyledTableCell>{intern["est-start"]}</StyledTableCell>
                        <StyledTableCell>{intern["est-end"]}</StyledTableCell>
                        <StyledTableCell>
                          {dayjs(intern["office-time"]).format("DD/MM/YYYY")}
                        </StyledTableCell>
                        {/* <StyledTableCell>{intern.statusIntern}</StyledTableCell>
                        <StyledTableCell>
                          {intern.statusIntern === "not-yet" && (
                            <Select
                              value={intern.attendanceStatus}
                              onChange={(event) =>
                                handleStatusChange(event, intern.id)
                              }
                              style={{ minWidth: 120 }}
                            >
                              <MenuItem value="absent">Absent</MenuItem>
                              <MenuItem value="not-yet">Not Yet</MenuItem>
                            </Select>
                          )}
                          {intern.statusIntern === "wait-for_admin" && (
                            <Select
                              value={intern.attendanceStatus}
                              onChange={(event) =>
                                handleStatusChange(event, intern.id)
                              }
                              style={{ minWidth: 120 }}
                            >
                              <MenuItem value="absent">Absent</MenuItem>
                              <MenuItem value="admin-approve">
                                Admin Approve
                              </MenuItem>
                            </Select>
                          )}
                          {intern.statusIntern !== "not-yet" &&
                            intern.statusIntern !== "wait-for_admin" && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Cannot edit
                              </Typography>
                            )}
                        </StyledTableCell> */}
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell colSpan={10} align="center">
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
          <DialogTitle id="dialog-title">Chi tiết lịch làm việc</DialogTitle>
          <DialogContent>
            <FilterTimeTable
              selectedDay={selectedDay}
              selectedDayName={selectedDayName}
            ></FilterTimeTable>
          </DialogContent>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default TimeTable;

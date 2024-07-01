import { TimeTableType } from "@/schemaValidations/timetable.schema";
import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
const DetailTimeTable = ({
  row,
  handleCloseCard,
}: {
  row: TimeTableType;
  handleCloseCard: () => void;
}) => {

  const renderStatus = (status: string) => {
    switch (status) {
      case "not-yet":
        return (
          <Typography
            variant="body2"
            style={{ color: "#AEC6CF", fontWeight: "bold" }} // Pastel xanh nhạt
          >
            - Đang chờ
          </Typography>
        );
      case "absent":
        return (
          <Typography
            variant="body2"
            style={{ color: "#FA896B", fontWeight: "bold" }} // Pastel cam
          >
            - Vắng mặt
          </Typography>
        );
      case "wait-for-admin":
        return (
          <Box display="flex" alignItems="center">
            <Typography
              variant="body2"
              style={{
                color: "#EEC759",
                fontWeight: "bold",
                marginRight: "8px",
              }} // Pastel vàng
            >
              - Chờ admin duyệt
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ThumbUpIcon></ThumbUpIcon>}
              onClick={() => console.log("admin-approve")}
              style={{ borderColor: "#77DD77", color: "#77DD77" }} // Pastel xanh lá cây
            >
              duyệt
            </Button>
          </Box>
        );
      case "admin-approve":
        return (
          <Typography
            variant="body2"
            style={{ color: "#A1EEBD", fontWeight: "bold" }} // Pastel xám
          >
            - Admin đã duyệt
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Grid container direction="column" spacing={2} style={{ marginTop: 10 }}>
      <Grid item>
          <Grid container height="30px">
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Ngày lên văn phòng:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">01/07/2024</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container height="30px">
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Giờ đến (dự kiến):
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">1:00</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container height="30px">
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Giờ đến (thực tế):
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" style={{ marginRight: "8px" }}>
                  12:49:00
                </Typography>
                {renderStatus("admin-approve")}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container height="30px">
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Giờ về (dự kiến):
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">4:00</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container height="30px">
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Giờ về (thực tế):
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" style={{ marginRight: "8px" }}>
                  4:00
                </Typography>
                {renderStatus("absent")}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="error">
          Absent
        </Button>
      </Box>
    </Box>
  );
};

export default DetailTimeTable;

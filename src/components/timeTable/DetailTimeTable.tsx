import { TimeTableType } from "@/schemaValidations/timetable.schema";
import React, { useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import timetableApiRequest from "@/apiRequests/timetable";
import { toast } from "@/components/ui/use-toast";

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
      case "admin-check":
        return (
          <Box display="flex" alignItems="center">
            <Typography
              variant="body2"
              style={{
                color: "#EEC759",
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              - Chờ admin duyệt
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ThumbUpIcon />}
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

  const renderTime = (time: string) => {
    return time ? time : "đang đợi";
  };

  const [loading, setLoading] = useState(false);

  async function handleSubmit(id: string, newStatus: string) {
    setLoading(true);

    const body = { verified: newStatus };
    try {
      const result = await timetableApiRequest.approveTimeTable(id, body);
      toast({
        title: `${result.payload.message}`,
        duration: 2000,
        variant: "success",
      });
      handleCloseCard();
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
              <Typography variant="body1">
                {renderTime(row["office-time"])}
              </Typography>
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
              <Typography variant="body1">
                {renderTime(row["est-start-time"])}
              </Typography>
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
                  {renderTime(row["act-clockin"])}
                </Typography>
                {renderStatus(row["clockin-validated"])}
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
              <Typography variant="body1">
                {renderTime(row["est-end-time"])}
              </Typography>
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
                  {renderTime(row["act-clockout"])}
                </Typography>
                {renderStatus(row["clockout-validated"])}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleSubmit(row.id, "absent")}
          disabled={loading}
        >
          {loading ? "..." : "Vắng mặt"}
        </Button>
      </Box>
    </Box>
  );
};

export default DetailTimeTable;

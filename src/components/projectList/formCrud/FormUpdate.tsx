"use client";
import {
  TextField,
  Typography,
  Grid,
  Box,
  styled,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";

const Div = styled("div")(({ theme }) => ({
  //   ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

interface RowData {
  // id: string;
  name: string;
  "start-date": string;
  duration: string;
}

const FormUpdate = ({ row }: { row: RowData }) => {
  console.log(row);
  return (
    <Div>
      <div style={{ textAlignLast: "center" }}>
        <Typography id="transition-modal-title" variant="h4" component="h2">
          Sửa dự án
        </Typography>
      </div>
      <form>
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Tên dự án</Typography>
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
                defaultValue={row.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Ngày bắt đầu</Typography>
              <TextField
                id="startDate"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
                defaultValue={dayjs(row['start-date']).format("YYYY-MM-DD")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Kéo dài</Typography>
              <TextField
                id="duration"
                variant="outlined"
                fullWidth
                style={{ marginTop: 2 }}
                size="small"
                defaultValue={row.duration}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="warning"
                startIcon={<EditIcon />}
                style={{ width: "100%" }}
              >
                Sửa dự án
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Div>
  );
};

export default FormUpdate;

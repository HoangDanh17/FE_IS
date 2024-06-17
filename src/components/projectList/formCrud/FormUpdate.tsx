"use client";
import {
  TextField,
  Typography,
  Grid,
  Box,
  styled,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import dayjs, { Dayjs } from "dayjs";
import { RowData } from "@/components/projectList/DetailCard";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { UpdateProjectType } from "@/schemaValidations/project.schema";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "@/components/ui/use-toast";
import projectApiRequest from "@/apiRequests/project";

const Div = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const FormUpdate = ({
  row,
  handleClose,
}: {
  row: RowData;
  handleClose: () => void;
}) => {
  const [formData, setFormData] = useState<UpdateProjectType>({
    description: row.description,
    duration: row.duration,
    name: row.name,
    "start-at": dayjs(row["start-date"]).format("YYYY-MM-DD"),
    id: row.id,
    status: row.status,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData({
      ...formData,
      "start-at": date ? date.toDate() : null,
    });
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    const { "start-at": startAt, ...rest } = formData;
    const formattedData = {
      ...rest,
      "start-date": startAt ? dayjs(startAt).format("YYYY-MM-DD") : null,
      id: row.id,
    };
    try {
      const result = await projectApiRequest.updateProject(formattedData);
      toast({
        title: `${result.payload.message}`,
        duration: 2000,
        variant: "success",
      });
      handleClose();
      router.refresh();
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Div>
        <div style={{ textAlignLast: "center" }}>
          <Typography id="transition-modal-title" variant="h4" component="h2">
            Sửa dự án
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, marginTop: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Tên dự án</Typography>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  size="small"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Ngày bắt đầu</Typography>
                <DatePicker
                  value={dayjs(formData["start-at"])}
                  onChange={(newValue) => handleDateChange(newValue)}
                  sx={{ marginTop: 1 }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Kéo dài</Typography>
                <TextField
                  id="duration"
                  name="duration"
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  size="small"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Thông tin mô tả</Typography>
                <TextField
                  id="description"
                  name="description"
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  size="small"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Trạng thái</Typography>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleSelectChange}
                  variant="standard"
                  size="small"
                  sx={{ marginTop: 1 }}
                  style={{ width: "100%" }}
                >
                  <MenuItem value={"not_start"}>Not start</MenuItem>
                  <MenuItem value={"doing"}>Doing</MenuItem>
                  <MenuItem value={"done"}>Done</MenuItem>
                  <MenuItem value={"cancel"}>Cancel</MenuItem>
                </Select>
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
    </LocalizationProvider>
  );
};

export default FormUpdate;

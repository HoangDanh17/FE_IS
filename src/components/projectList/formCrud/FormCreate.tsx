"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Typography,
  Grid,
  Box,
  styled,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import projectApiRequest from "@/apiRequests/project";
import { CreateProjectType } from "@/schemaValidations/project.schema";

const Div = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const FormCreate = ({ handleClose }: { handleClose: () => void }) => {
  const [formData, setFormData] = useState<CreateProjectType>({
    description: "",
    duration: "",
    name: "",
    "start-at": new Date(),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    const formattedData = {
      ...formData,
      "start-at": formData["start-at"]
        ? dayjs(formData["start-at"]).format("YYYY-MM-DD")
        : null,
    };

    try {
      const result = await projectApiRequest.createProject(formattedData);
      toast({
        title: `${result.payload.message}`,
        duration: 2000,
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: `${error}`,
        duration: 2000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      handleClose();
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Div>
        <div style={{ textAlign: "center" }}>
          <Typography id="transition-modal-title" variant="h4" component="h2">
            Tạo dự án
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, marginTop: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Tên dự án</Typography>
                <TextField
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Nhập tên dự án"
                  style={{ marginTop: 2 }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Mô tả</Typography>
                <TextField
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Nhập chi tiết thông tin"
                  style={{ marginTop: 2 }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Thời gian dự kiến</Typography>
                <TextField
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Nhập thời hạn"
                  style={{ marginTop: 2 }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ marginBottom: 4 }}>
                  Ngày bắt đầu
                </Typography>
                <DatePicker
                  value={dayjs(formData["start-at"])}
                  onChange={(newValue) => handleDateChange(newValue)}
                  slotProps={{ textField: { fullWidth: true, size: "small" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                  color="primary"
                  style={{ width: "100%" }}
                >
                  Tạo dự án
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Div>
    </LocalizationProvider>
  );
};

export default FormCreate;

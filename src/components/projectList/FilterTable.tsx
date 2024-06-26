"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Typography,
  Grid,
  styled,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import SearchIcon from "@mui/icons-material/Search";
import ProjectListTable, {
  FormFilterData,
} from "@/components/projectList/ProjectListTable";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const statusLabels: { [key: string]: string } = {
  not_start: "Chưa bắt đầu",
  doing: "Đang thực hiện",
  done: "Hoàn thành",
  cancel: "Hủy bỏ",
};

const FilterTable = () => {
  const [formData, setFormData] = useState<FormFilterData>({
    name: "",
    status: "",
    "start-date-from": "",
    "start-date-to": "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handleDateChange = (name: string, date: Dayjs | null) => {
    setFormData({
      ...formData,
      [name]: date ? date.format("YYYY-MM-DD") : "",
    });
  };

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [dataFilter, setDataFilter] = useState<FormFilterData | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsFilter(true);
    setDataFilter(formData);
  }

  const handleReset = () => {
    setFormData({
      name: "",
      status: "",
      "start-date-from": "",
      "start-date-to": "",
    });
    setIsFilter(false);
    setDataFilter(null);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={1}>
          <Grid item xs={24}>
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Tìm kiếm thông tin</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <TextField
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        id="name"
                        label="Tên dự án"
                        variant="standard"
                        size="small"
                        style={{ width: "90%", marginTop: 6 }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <DatePicker
                        label="Ngày bắt đầu từ"
                        value={
                          formData["start-date-from"]
                            ? dayjs(formData["start-date-from"])
                            : null
                        }
                        onChange={(date) =>
                          handleDateChange("start-date-from", date)
                        }
                        slotProps={{
                          textField: {
                            variant: "standard",
                            style: {
                              marginTop: 3,
                              marginRight: 6,
                              width: "90%",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <DatePicker
                        label="Ngày bắt đầu đến"
                        value={
                          formData["start-date-to"]
                            ? dayjs(formData["start-date-to"])
                            : null
                        }
                        onChange={(date) =>
                          handleDateChange("start-date-to", date)
                        }
                        slotProps={{
                          textField: {
                            variant: "standard",
                            style: { marginTop: 3, width: "90%" },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <InputLabel id="status-label">Trạng thái</InputLabel>
                      <Select
                        labelId="status-label"
                        id="status"
                        value={formData.status}
                        onChange={handleSelectChange}
                        displayEmpty
                        variant="standard"
                        size="small"
                        style={{ width: "90%" }}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Chọn trạng thái</em>;
                          }
                          return statusLabels[selected];
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Chọn trạng thái</em>
                        </MenuItem>
                        <MenuItem value="not_start">Chưa bắt đầu</MenuItem>
                        <MenuItem value="doing">Đang thực hiện</MenuItem>
                        <MenuItem value="done">Hoàn thành</MenuItem>
                        <MenuItem value="cancel">Hủy bỏ</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={5} style={{ width: "100%" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SearchIcon />}
                        style={{ width: "50%", marginTop: 4, marginRight: 5 }}
                      >
                        Tìm kiếm
                      </Button>
                      <Button
                        onClick={handleReset}
                        startIcon={<CleaningServicesIcon />}
                        style={{
                          width: "40%",
                          marginTop: 4,
                        }}
                        color="error"
                      >
                        Hủy tìm kiếm
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </LocalizationProvider>
      <ProjectListTable
        isFilter={isFilter}
        dataFilter={dataFilter}
        handleReset={handleReset}
      ></ProjectListTable>
    </div>
  );
};

export default FilterTable;

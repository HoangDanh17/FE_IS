"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Typography,
  Grid,
  Box,
  styled,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import SearchIcon from "@mui/icons-material/Search";
import projectApiRequest from "@/apiRequests/project";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ProjectListTable, {
  FormFilterData,
} from "@/components/projectList/ProjectListTable";
import { ProjectListResType } from "@/schemaValidations/project.schema";

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

const FilterTable = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<FormFilterData>({
    name: "",
    status: "not_start",
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
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsFilter(true);
  }

  const handleReset = () => {
    setFormData({
      name: "",
      status: "not_start",
      "start-date-from": "",
      "start-date-to": "",
    });
    setIsFilter(false);
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
                        variant="standard"
                        size="small"
                        defaultValue="not_start"
                        style={{ width: "90%" }}
                      >
                        <MenuItem value={"not_start"}>Not start</MenuItem>
                        <MenuItem value={"doing"}>Doing</MenuItem>
                        <MenuItem value={"done"}>Done</MenuItem>
                        <MenuItem value={"cancel"}>Cancel</MenuItem>
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
        formData={formData}
      ></ProjectListTable>
    </div>
  );
};

export default FilterTable;

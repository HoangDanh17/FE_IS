"use client";
import * as z from "zod";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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

  const schema = z.object({
    nameProject: z.string(),
    duration: z.string(),
    status: z.number(),
    managerName: z.string(),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nameProject: "",
      duration: "",
      status: 1, // Set default value for status as a number
      managerName: "",
    },
  });

  async function onSubmit(values: FormData) {
    // if (loading) return;
    // setLoading(true);
    console.log("Form Data123:", values);
    // setLoading(false);
    return;
  }

  return (
    <div>
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
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Controller
                      name="nameProject"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="nameProject"
                            label="nameProject"
                            variant="standard"
                            size="small"
                            style={{ width: "90%", marginTop: 6 }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Controller
                      name="duration"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="duration"
                            label="duration"
                            variant="standard"
                            size="small"
                            style={{ width: "90%", marginTop: 6 }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="managerName"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="managerName"
                            label="managerName"
                            variant="standard"
                            size="small"
                            style={{ width: "90%", marginTop: 6 }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="status"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <InputLabel id="status-label">Trạng thái</InputLabel>
                          <Select
                            {...field}
                            labelId="status-label"
                            id="status"
                            label="status"
                            variant="standard"
                            size="small"
                            style={{ width: "90%" }}
                            error={!!error}
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(Number(e.target.value));
                            }}
                          >
                            <MenuItem value={1}>Todo</MenuItem>
                            <MenuItem value={2}>In Progress</MenuItem>
                            <MenuItem value={3}>Testing</MenuItem>
                            <MenuItem value={4}>Done</MenuItem>
                          </Select>
                        </div>
                      )}
                    />
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
                      startIcon={<CleaningServicesIcon />}
                      style={{
                        width: "40%",
                        marginTop: 4,
                        // backgroundColor: "#e2e8f0",
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
    </div>
  );
};

export default FilterTable;

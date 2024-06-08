"use client";
import * as z from "zod";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Button, Grid, InputLabel, TextField } from "@mui/material";
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

  const schema = z
    .object({
      name: z.string(),
      address: z.string(),
      email: z.string(),
      phone: z.string(),
      term: z.string(),
      age: z.number(),
      gender: z.string(),
    })
    .strict();

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "0",
      term: "",
      age: 0,
      gender: "",
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
                      name="name"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="name"
                            label="name"
                            variant="standard"
                            size="small"
                            style={{ width: "90%" }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Controller
                      name="address"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="address"
                            label="address"
                            variant="standard"
                            size="small"
                            style={{ width: "90%" }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="email"
                            label="email"
                            variant="standard"
                            size="small"
                            style={{ width: "90%" }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="phone"
                            label="phone"
                            variant="standard"
                            size="small"
                            style={{ width: "90%" }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="term"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="term"
                            label="term"
                            variant="standard"
                            size="small"
                            style={{ width: "90%" }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="age"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="age"
                            label="age"
                            type="number"
                            variant="standard"
                            size="small"
                            style={{ width: "90%" }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="gender"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <div>
                          <TextField
                            {...field}
                            id="gender"
                            label="gender"
                            variant="standard"
                            size="small"
                            style={{ width: "90%" }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<SearchIcon />}
                      style={{ width: "50%", marginLeft: 30,marginTop:8 }}
                    >
                      Tìm kiếm
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

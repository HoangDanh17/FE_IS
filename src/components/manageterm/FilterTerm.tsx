"use client"; // Add this line at the top

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  Input,
  Button,
  FormControl,
  Grid,
  CardContent,
  CardHeader,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // Use next/navigation
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TermTable, { RowData } from "./TermTable";

const Filter: React.FC = () => {
  const [formData, setFormData] = useState<RowData>({
    id: "",
    semester: "",
    university: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name: string, date: Dayjs | null) => {
    setFormData({
      ...formData,
      [name]: date ? date.format("YYYY-MM-DD") : null,
    });
  };

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [dataFilter, setDataFilter] = useState<RowData | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData); // Added console.log
    setIsFilter(true);
    setDataFilter(formData);
  };

  const handleReset = () => {
    setFormData({
      id: "",
      semester: "",
      university: "",
    });
    setIsFilter(false);
    setDataFilter(null);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Accordion defaultExpanded>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Tìm kiếm thông tin</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <Input
                        name="id"
                        placeholder="ID"
                        value={formData.id}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <Input
                        name="university"
                        placeholder="University"
                        value={formData.university}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <Input
                        name="semester"
                        placeholder="Semester"
                        value={formData.semester}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3} container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Search />}
                        className="search-btn"
                        fullWidth
                      >
                        Search
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={handleReset}
                        className="clean-btn"
                        fullWidth
                      >
                        Clean Filter
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </FormControl>
            </form>
          </AccordionDetails>
        </Accordion>
      </LocalizationProvider>
      <TermTable
        isFilter={isFilter}
        dataFilter={dataFilter}
        handleReset={handleReset}
      />
    </>
  );
};

export default Filter;

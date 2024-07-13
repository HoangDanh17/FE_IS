"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MonthlyEarnings from "@/components/dashboard/MonthlyEarnings";
import SalesOverview from "@/components/dashboard/SalesOverview";
import YearlyBreakup from "@/components/dashboard/YearlyBreakup";

const handleExport = async (id: string|number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/reports/${id}/project-intern`,
      {
        method: "GET",
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Lấy filename từ header Content-Disposition nếu có
    const contentDisposition = response.headers.get("Content-Disposition");
    let filename = "export.xlsx";
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
      if (filenameMatch?.length === 2) {
        filename = filenameMatch[1];
      }
    }

    // Chuyển response thành blob
    const blob = await response.blob();

    // Tạo một URL object từ blob
    const url = window.URL.createObjectURL(blob);

    // Tạo một thẻ a tạm thời để tải xuống
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;

    // Thêm thẻ a vào body, kích hoạt click, sau đó xóa nó
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

const Dashboard = () => {
  const handleExportId = () => {
    const id = 1;
    handleExport(id);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="mb-4 mr-4 bg-green-600"
        onClick={handleExportId}
      >
        Xuất excel
      </Button>

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;

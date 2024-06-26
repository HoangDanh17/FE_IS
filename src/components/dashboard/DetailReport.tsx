import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

const DetailReport = () => {
  const project = {
    name: "Nguyễn Văn A",
    tasks: 20,
    totalTasks: 30,
    totalTime: 50,
    officeDays: 10,
    officeHours: 30,
  };

  const totalAvailableTime = 60;

  const colors = ["#FF9999", "#99FF99", "#9999FF", "#FFFF99"];
  const categories = [
    "Số task",
    "Tổng thời gian (giờ)",
    "Số buổi lên văn phòng",
    "Tổng thời gian làm việc (giờ)",
  ];

  const getChartOptions = () => ({
    chart: {
      type: "bar" as const,
    },
    title: {
      text: "Báo cáo chi tiết",
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => val.toFixed(0),
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        distributed: true,
      },
    },
    fill: {
      opacity: 1,
    },
    colors: colors,
    legend: {
      show: false,
    },
  });

  const getChartData = (project: any) => ({
    series: [
      {
        name: "Thông số",
        data: [
          {
            x: "Số task",
            y: project.tasks,
            fillColor: colors[0],
          },
          {
            x: "Tổng thời gian (giờ)",
            y: project.totalTime,
            fillColor: colors[1],
          },
          {
            x: "Số buổi lên văn phòng",
            y: project.officeDays,
            fillColor: colors[2],
          },
          {
            x: "Tổng thời gian làm việc (giờ)",
            y: project.officeHours,
            fillColor: colors[3],
          },
        ],
      },
    ],
  });

  const getRadialChartOptions = (label: string) => ({
    chart: {
      type: "radialBar" as const,
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "14px",
            offsetY: 5,
            formatter: (val: number) => `${val}%`,
          },
          total: {
            show: true,
            label: label,
            formatter: function (opts: any) {
              if (label === "Hoàn thành Task") {
                return `${Math.round((project.tasks / project.totalTasks) * 100)}%`;
              } else {
                return `${Math.round((project.totalTime / totalAvailableTime) * 100)}%`;
              }
            },
          },
        },
      },
    },
    labels: [label],
    colors: ["#FF9999"],
  });

  const getRadialChartData = (value: number, total: number) => ({
    series: [(value / total) * 100],
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 2 }}>
      <Card sx={{ width: "45%", margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ textAlign: "center", marginBottom: 2 }}>
            {project.name}
          </Typography>
          <Chart options={getChartOptions()} series={getChartData(project).series} type="bar" height={350} />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            {categories.map((category, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
                <Box sx={{ width: 12, height: 12, backgroundColor: colors[index], borderRadius: "50%", marginRight: 1 }} />
                <Typography variant="body2">{category}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ width: "45%", margin: 2, display: "flex", flexDirection: "column" }}>
        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ textAlign: "center", marginBottom: 2 }}>
              Tiến độ hoàn thành Task
            </Typography>
            <Chart options={getRadialChartOptions("Hoàn thành Task")} series={getRadialChartData(project.tasks, project.totalTasks).series} type="radialBar" height={350} />
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="body2">Số task đã hoàn thành: {project.tasks}</Typography>
              <Typography variant="body2">Tổng số task hiện tại: {project.totalTasks}</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: "#FF9999", borderRadius: "50%", marginRight: 1 }} />
                  <Typography variant="body2">Hoàn thành Task</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ textAlign: "center", marginBottom: 2 }}>
              Tiến độ tổng thời gian
            </Typography>
            <Chart options={getRadialChartOptions("Tổng thời gian")} series={getRadialChartData(project.totalTime, totalAvailableTime).series} type="radialBar" height={350} />
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="body2">Tổng thời gian: {project.totalTime} giờ</Typography>
              <Typography variant="body2">Tổng thời gian có thể: {totalAvailableTime} giờ</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: "#FF9999", borderRadius: "50%", marginRight: 1 }} />
                  <Typography variant="body2">Tổng thời gian</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DetailReport;

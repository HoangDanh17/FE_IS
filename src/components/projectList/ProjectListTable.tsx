"use client";
import { Box, Fade, Modal, Button, Chip, Fab, Skeleton } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import FormCreate from "@/components/projectList/formCrud/FormCreate";
import AddIcon from "@mui/icons-material/Add";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import DetailCard from "@/components/projectList/DetailCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import projectApiRequest from "@/apiRequests/project";
import { ProjectListResType } from "@/schemaValidations/project.schema";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleCard = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export interface FormFilterData {
  name: string;
  status: string;
  "start-date-from": string;
  "start-date-to": string;
}

export default function ProjectListTable({
  isFilter,
  dataFilter,
  handleReset,
}: {
  isFilter: boolean;
  dataFilter: FormFilterData | null;
  handleReset: () => void;
}) {
  const [data, setData] = useState<ProjectListResType | null>(null);
  const [limit, setLimit] = useState(9);
  const [loading, setLoading] = useState(false);
  const handleLoadMore = () => setLimit(limit + 9);
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { payload } = await projectApiRequest.getListProject(
          limit,
          isFilter ? dataFilter : {}
        );
        setData(payload);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isFilter, dataFilter, limit, refreshKey]);

  // Card click
  const [openCardModal, setOpenCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const handleCloseCardModal = () => {
    setOpenCardModal(false);
    handleReset();
    triggerRefresh();
  };

  const handleOpenCardModal = (row: object) => {
    setSelectedCard(row);
    setOpenCardModal(true);
  };

  // Create modal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    handleReset();
  };

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "not_start":
        return { backgroundColor: "#FFB6C1", color: "white" }; // Màu hồng pastel đậm hơn
      case "doing":
        return { backgroundColor: "#87CEEB", color: "white" }; // Màu xanh dương pastel đậm hơn
      case "done":
        return { backgroundColor: "#90EE90", color: "white" }; // Màu xanh lá pastel đậm hơn
      case "cancel":
        return { backgroundColor: "#FFA07A", color: "white" }; // Màu cam pastel đậm hơn
      default:
        return { backgroundColor: "#D3D3D3", color: "white" }; // Màu xám
    }
  };

  return (
    <div>
      <div
        style={{
          marginTop: 20,
          width: "100%",
          backgroundColor: "white",
          padding: 8,
        }}
      >
        {/* Card */}
        <div className="flex mb-4">
          <Label style={{ fontSize: 36, alignSelf: "center", marginRight: 12 }}>
            Quản lí dự án
          </Label>
          <Fab
            style={{ alignSelf: "center" }}
            size="small"
            color="default"
            aria-label="edit"
            variant="extended"
            onClick={handleOpenCreateModal}
          >
            <AddIcon sx={{ mr: 1 }} />
            Tạo dự án
          </Fab>
        </div>
        <ScrollArea className="h-[321px] rounded-md border p-2">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {loading
              ? Array.from(new Array(9)).map((_, index) => (
                  <Card key={index} className="w-[360px]">
                    <CardHeader>
                      <Skeleton variant="text" width="80%" height={30} />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={60}
                      />
                    </CardHeader>
                  </Card>
                ))
              : data?.data.map((project, index) => (
                  <Card
                    onClick={() => handleOpenCardModal(project)}
                    key={index}
                    className="w-[360px] hover:scale-110 duration-300 cursor-grab shadow-lg"
                  >
                    <CardHeader>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          height: "auto",
                        }}
                      >
                        <CardTitle style={{ alignContent: "center" }}>
                          {project.name}
                        </CardTitle>
                        <Chip
                          size="small"
                          label={
                            project.status === "not_start"
                              ? "not start"
                              : project.status
                          }
                          sx={getStatusChipColor(project.status)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent style={{ paddingRight: 18 }}>
                      <div className="flex flex-row space-x-2 w-full">
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-row space-x-1">
                            <Label>Startdate:</Label>
                            <Label>
                              {dayjs(project["start-date"]).format(
                                "DD/MM/YYYY"
                              )}
                            </Label>
                          </div>
                        </div>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-row space-x-1.5">
                            <Label>Duration:</Label>
                            <Label>{project.duration}</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
          <div className="flex justify-center">
            <Button onClick={handleLoadMore} style={{ marginTop: 16 }}>
              Load More
            </Button>
          </div>
        </ScrollArea>
      </div>
      {/* Modal Create*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openCreateModal}>
          <Box sx={style}>
            <FormCreate handleClose={handleCloseCreateModal}></FormCreate>
          </Box>
        </Fade>
      </Modal>
      {/* Card Detail */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openCardModal}
        onClose={handleCloseCardModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openCardModal}>
          <Box sx={styleCard}>
            <DetailCard
              row={selectedCard}
              handleCloseCard={handleCloseCardModal}
            ></DetailCard>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

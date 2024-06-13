"use client";
import * as React from "react";
import {
  Box,
  Fade,
  Modal,
  Typography,
  Button,
  Chip,
  Fab,
  Skeleton,
} from "@mui/material";
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

const confirmDeleteStyle = {
  ...style,
  width: 300,
};

export interface FormFilterData {
  name: string;
  status: string;
  "start-date-from": string;
  "start-date-to": string;
}

export default function ProjectListTable({
  isFilter,
  formData,
}: {
  isFilter: boolean;
  formData: FormFilterData;
}) {
  const [data, setData] = React.useState<ProjectListResType | null>(null);
  const [limit, setLimit] = React.useState(9);
  const [loading, setLoading] = React.useState(false);
  const handleLoadMore = () => setLimit(limit + 9);

  React.useEffect(() => {
    if (!isFilter) {
      setLoading(true);
      projectApiRequest
        .getListProject(limit, {})
        .then(({ payload }) => {
          setData(payload);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      projectApiRequest
        .getListProject(limit, formData)
        .then(({ payload }) => {
          setData(payload);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isFilter, limit]);

  // Card click
  const [openCardModal, setOpenCardModal] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<any>(null);

  const handleCloseCardModal = () => setOpenCardModal(false);

  const handleOpenCardModal = (row: object) => {
    console.log(row);
    setSelectedCard(row);
    setOpenCardModal(true);
  };

  // Create modal
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  // Edit modal

  //Delete modal
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] =
    React.useState(false);

  const [rowToDelete, setRowToDelete] = React.useState<number | null>(null);
  const handleOpenDeleteConfirmModal = (id: number) => {
    setRowToDelete(id);
    setOpenDeleteConfirmModal(true);
  };

  const handleCloseDeleteConfirmModal = () => setOpenDeleteConfirmModal(false);
  const handleDelete = () => {
    if (rowToDelete !== null) {
      console.log(rowToDelete);
      handleCloseDeleteConfirmModal();
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
            {data?.data.map((project, index) => (
              <Card
                onClick={() => handleOpenCardModal(project)}
                key={index}
                className="w-[360px] hover:scale-110 duration-300 cursor-grab shadow-lg	"
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
                    <Chip size="small" label={project.status} />
                  </div>
                </CardHeader>
                <CardContent style={{ paddingRight: 18 }}>
                  <div className="flex flex-row space-x-2 w-full">
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-row space-x-1">
                        <Label>Startdate:</Label>
                        <Label>
                          {dayjs(project["start-date"]).format("DD/MM/YYYY")}
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
            <FormCreate></FormCreate>
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
            <DetailCard row={selectedCard}></DetailCard>
          </Box>
        </Fade>
      </Modal>

      {/* Modal Delete Confirm */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDeleteConfirmModal}
        onClose={handleCloseDeleteConfirmModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteConfirmModal}>
          <Box sx={confirmDeleteStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Xác nhận xóa
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Bạn có chắc chắn muốn xóa hàng này không?
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleCloseDeleteConfirmModal}
                style={{ marginRight: 8 }}
              >
                Hủy
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Xóa
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

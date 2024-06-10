"use client";
import * as React from "react";
import { Box, Fade, Modal, Typography, Button, Chip, Fab } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import FormCreate from "@/components/projectList/formCrud/FormCreate";
import AddIcon from "@mui/icons-material/Add";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import DetailCard from "@/components/projectList/DetailCard";
import { ScrollArea } from "@/components/ui/scroll-area";

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

function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Cupcake", 305, 3.7, 67, 4.3),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Brownie", 412, 12.5, 38, 4.2),
  createData(7, "Cheesecake", 328, 14.0, 22, 5.1),
  createData(8, "Donut", 179, 8.3, 31, 3.7),
  createData(9, "Macaroon", 94, 3.2, 15, 4.8),
  createData(10, "Tart", 287, 11.7, 39, 4.6),
  createData(11, "Pie", 415, 17.8, 28, 4.9),
  createData(12, "Muffin", 206, 9.6, 33, 4.1),
  createData(13, "Cookie", 137, 6.4, 27, 3.8),
  createData(14, "Croissant", 295, 13.2, 41, 4.5),
  createData(15, "Scone", 218, 10.1, 35, 4.3),
];

interface TableHeader {
  label: string;
  align?: "right" | "center" | "inherit" | "left" | "justify";
}
const tableHeaders: TableHeader[] = [
  { label: "ID", align: "center" },
  { label: "Dessert (100g serving)" },
  { label: "Calories", align: "center" },
  { label: "Fat (g)", align: "center" },
  { label: "Carbs (g)", align: "center" },
  { label: "Protein (g)", align: "center" },
  { label: "Action", align: "center" },
];

const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

export default function ProjectListTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const projects = [
    { title: "Project 1", startDate: "03/06/2024", duration: "6 months" },
    { title: "Project 2", startDate: "04/07/2024", duration: "5 months" },
    { title: "Project 3", startDate: "05/08/2024", duration: "4 months" },
    { title: "Project 4", startDate: "06/09/2024", duration: "3 months" },
    { title: "Project 5", startDate: "07/10/2024", duration: "2 months" },
    { title: "Project 6", startDate: "08/11/2024", duration: "1 month" },
    { title: "Project 7", startDate: "08/11/2024", duration: "1 month" },
    { title: "Project 8", startDate: "08/11/2024", duration: "1 month" },
    { title: "Project 9", startDate: "08/11/2024", duration: "1 month" },
    { title: "Project 10", startDate: "08/11/2024", duration: "1 month" },
    { title: "Project 11", startDate: "08/11/2024", duration: "1 month" },
    { title: "Project 12", startDate: "08/11/2024", duration: "1 month" },
    { title: "Project 13", startDate: "08/11/2024", duration: "1 month" },
    { title: "Project 14", startDate: "08/11/2024", duration: "1 month" },
    { title: "Project 15", startDate: "08/11/2024", duration: "1 month" },
  ];

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //   <Button
  //   variant="contained"
  //   style={{ marginRight: 8 }}
  //   size="small"
  //   startIcon={<EditIcon />}
  //   onClick={() => handleOpenUpdateModal(row)}
  //   color="warning"
  // >
  //   Edit
  // </Button>
  // <Button
  //   variant="contained"
  //   color="error"
  //   size="small"
  // >
  //   Delete
  // </Button>
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
            {projects.map((project, index) => (
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
                      {project.title}
                    </CardTitle>
                    <Chip size="small" label="in progress" />
                  </div>
                </CardHeader>
                <CardContent style={{ paddingRight: 18 }}>
                  <div className="flex flex-row space-x-2 w-full">
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-row space-x-1">
                        <Label>Startdate:</Label>
                        <Label>{project.startDate}</Label>
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

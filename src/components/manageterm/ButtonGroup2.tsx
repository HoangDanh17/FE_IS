'use client'
import * as React from 'react';
import { Button, Card, CardContent, Modal } from "@mui/material";
import "@/components/css/manageintern/ButtonGroup.css";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddModal from './AddModal2';
import EditModal from './EditModal2';
import DeleteModal from './DeleteModal2';

const ButtonGroup2 = () => {
    //useState Modal Add
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    //useState Modal Edit
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    //useState Modal Delete
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    //Placeholder functions for Edit and Delete
    const handleEdit = () => {
        console.log("Edit button clicked");
        // Add your edit logic here
        handleCloseEditModal();
    };

    const handleDelete = () => {
        console.log("Delete button clicked");
        // Add your delete logic here
        handleCloseDeleteModal();
    };

    return (
        <Card style={{ marginTop: "10px" }}>
            <CardContent style={{ height: "68px" }}>
                <Button variant="contained" color="success" className="import-btn">Nhập Excel</Button>

                <Button
                    variant="contained"
                    className="add-btn"
                    startIcon={<AddOutlinedIcon />}
                    onClick={handleOpenAddModal}
                >
                    Thêm
                </Button>

                <Button
                    variant="contained"
                    className="edit-btn"
                    startIcon={<EditOutlinedIcon />}
                    onClick={handleOpenEditModal}
                >
                    Sửa
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    className="delete-btn"
                    startIcon={<DeleteOutlinedIcon />}
                    onClick={handleOpenDeleteModal}
                >
                    Xóa
                </Button>

                {/* Modal Add */}
                <Modal
                    open={openAddModal}
                    onClose={handleCloseAddModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddModal onClose={handleCloseAddModal} />
                </Modal>

                {/* Modal Edit */}
                <Modal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <EditModal
                        onClose={handleCloseEditModal}
                        onEdit={handleEdit}
                    />
                </Modal>

                {/* Modal Delete */}
                <Modal
                    open={openDeleteModal}
                    onClose={handleCloseDeleteModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <DeleteModal
                        open={openDeleteModal}
                        onClose={handleCloseDeleteModal}
                        onDelete={handleDelete}
                    />
                </Modal>
            </CardContent>
        </Card>
    )
}

export default ButtonGroup2;
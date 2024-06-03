'use client'
import * as React from 'react';
import { Button, Card, CardContent, Modal } from "@mui/material";
import "@/styles/accountManagement/ButtonGroup.css";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddModalMemberProject from './AddModal';
import EditModalMemberProject from './EditModal';

const ButtonGroupMemberProject = () => {
    //useState Modal Add
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    //useState Modal Edit
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

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
                    color='warning'
                    className="edit-btn"
                    startIcon={<EditOutlinedIcon />}
                    onClick={handleOpenEditModal}
                >
                    Sửa
                </Button>

                <Button
                    variant="contained"
                    color='error'
                    className="delete-btn"
                    startIcon={<DeleteOutlineOutlinedIcon />}
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
                    <AddModalMemberProject onClose={handleCloseAddModal} />
                </Modal>

                <Modal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <EditModalMemberProject onClose={handleCloseEditModal} />
                </Modal>
            </CardContent>
        </Card>
    )
}

export default ButtonGroupMemberProject;
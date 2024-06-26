'use client'
import * as React from 'react';
import { Button, Card, CardContent, Modal, Box, Typography } from "@mui/material";
import "@/styles/accountManagement/ButtonGroup.css";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddModalAccount from './AddAccountModal';
import EditModalAccount from './EditModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { RowData } from './Table';
import { useRouter } from "next/navigation";

interface ButtonGroupAccountProps {
    row: RowData | undefined;
    triggerRefresh: () => void;
}

const ButtonGroupAccount: React.FC<ButtonGroupAccountProps> = ({ row, triggerRefresh }) => {
    const [loading, setLoading] = React.useState(false);

    //useState Modal Add
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    
    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        triggerRefresh();
    }

    //useState Modal Edit
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = () => {
        if (row) {
            setOpenEditModal(true);
        }
    }
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        triggerRefresh();
    }

    // useState Modal Confirm Delete
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const handleOpenDeleteModal = () => {
        if (row) {
            setOpenDeleteModal(true);
        }
    }
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }

    // handle close for all
    const closeForAll = () => {
        setOpenAddModal(false),
        setOpenEditModal(false)
    }

    return (
        <Card style={{ marginTop: "10px" }}>
            <CardContent style={{ height: "68px" }}>

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
                    onClick={handleOpenDeleteModal}
                >
                    Xóa
                </Button>

                {/* Modal Add */}
                <Modal
                    open={openAddModal}
                    onClose={closeForAll}

                >
                    <AddModalAccount onClose={handleCloseAddModal} />
                </Modal>

                {/* Modal Edit */}
                <Modal
                    open={openEditModal}
                    onClose={closeForAll}
                >
                    <EditModalAccount onClose={handleCloseEditModal} row={row} />
                </Modal>

                {/* Modal Confirm Delete */}
                <Modal
                    open={openDeleteModal}
                    onClose={closeForAll}
                >
                    <ConfirmDeleteModal onClose={handleCloseDeleteModal} row={row} />
                </Modal>
            </CardContent>
        </Card>
    )
}

export default ButtonGroupAccount;
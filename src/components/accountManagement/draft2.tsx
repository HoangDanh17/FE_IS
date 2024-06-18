'use client'
import * as React from 'react';
import { Button, Card, CardContent } from "@mui/material";
import "@/styles/accountManagement/ButtonGroup.css";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddModalAccount from './AddAccountModal';
import EditModalAccount from './EditModal';
import { RowData } from './Table';
import accountApiRequest from "@/lib/accountApiRequest"; // Import API requests
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ButtonGroupAccountProps {
    row: RowData | undefined;
    onDeleteSuccess: () => void; // Callback to refresh the list after delete
}

const ButtonGroupAccount: React.FC<ButtonGroupAccountProps> = ({ row, onDeleteSuccess }) => {
    //useState Modal Add
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    //useState Modal Edit
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    const handleDelete = async () => {
        if (row) {
            try {
                await accountApiRequest.deleteAccount(row.id);
                onDeleteSuccess();
                toast.success("Account deleted successfully");
            } catch (error) {
                console.error("Error deleting account", error);
                toast.error("Failed to delete account");
            }
        }
    };

    const confirmDelete = () => {
        toast(
            ({ closeToast }) => (
                <div>
                    Are you sure you want to delete this account?
                    <div>
                        <Button
                            variant="contained"
                            color='error'
                            onClick={() => {
                                handleDelete();
                                closeToast();
                            }}
                            style={{ marginRight: "10px" }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            onClick={closeToast}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ),
            {
                autoClose: false
            }
        );
    };

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
                    onClick={confirmDelete}
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
                    <AddModalAccount onClose={handleCloseAddModal} />
                </Modal>

                {/* Modal Edit */}
                <Modal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <EditModalAccount onClose={handleCloseEditModal} row={row} />
                </Modal>

                <ToastContainer />
            </CardContent>
        </Card>
    )
}

export default ButtonGroupAccount;

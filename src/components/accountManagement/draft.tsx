'use client'
import * as React from 'react';
import { Button, Card, CardContent, Modal } from "@mui/material";
import "@/styles/accountManagement/ButtonGroup.css";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddModalAccount from './AddAccountModal';
import EditModalAccount from './EditModal';
import { RowData } from './Table';
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import accountApiRequest from '@/apiRequests/accountManagement/account';
import { ToastContainer, toast as reactToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ButtonGroupAccountProps {
    row: RowData | undefined;
}

const ButtonGroupAccount: React.FC<ButtonGroupAccountProps> = ({ row }) => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    //useState Modal Add
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    //useState Modal Edit
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    //handle delete
    const handleDelete = async () => {
        if (row) {
            try {
                setLoading(true);
                await accountApiRequest.deleteAccount(row.id);    
                toast({
                    title: `Delete account with ${row.id} successfully!`,
                    duration: 2000,
                    variant: "success",
                });
                router.refresh();
            } catch (error: any) {
                toast({
                    title: `${error}`,
                    duration: 2000,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    // handle confirm delete
    const confirmDelete = () => {
        reactToast(
            <div>
                <p>Are you sure you want to delete this account?</p>
                <Button onClick={() => { reactToast.dismiss(); handleDelete(); }} color="error">Yes</Button>
                <Button onClick={() => reactToast.dismiss()} color="primary">No</Button>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
            }
        );
    };

    return (
        <>
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

                    <Modal
                        open={openEditModal}
                        onClose={handleCloseEditModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <EditModalAccount onClose={handleCloseEditModal} row={row} />
                    </Modal>
                </CardContent>
            </Card>
            <ToastContainer />
        </>
    )
}

export default ButtonGroupAccount;

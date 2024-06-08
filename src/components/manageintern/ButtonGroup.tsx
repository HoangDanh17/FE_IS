'use client'
import * as React from 'react';
import { Button, Card, CardContent, Modal } from "@mui/material";
import "@/components/css/manageintern/ButtonGroup.css";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddModal from './AddModal';

const ButtonGroup = () => {
    //useState Modal Add
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

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

                {/* Modal Add */}
                <Modal
                    open={openAddModal}
                    onClose={handleCloseAddModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddModal onClose={handleCloseAddModal} />
                </Modal>
            </CardContent>
        </Card>

    )
}

export default ButtonGroup;
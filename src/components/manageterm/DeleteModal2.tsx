// DeleteModal.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onDelete }) => {
    return (
        <Box className="modal-box">
            <Typography variant="h6" component="h2">
                Xác nhận xóa
            </Typography>
            <Typography variant="body1">
                Bạn có chắc chắn muốn xóa thông tin này?
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={onDelete} variant="contained" color="error" sx={{ ml: 1 }}>
                    Xóa
                </Button>
            </Box>
        </Box>
    );
};

export default DeleteModal;
'use client';
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface RowData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  skill: string[];
}

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  rowData: RowData | null; // Add this line to the interface
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onDelete, rowData }) => {
  return (
    <Box className="modal-box">
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Xóa tài khoản
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Bạn có chắc chắn muốn xóa tài khoản {rowData?.name}?
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onDelete} color="error">Xóa</Button>
      </Box>
    </Box>
  );
};

export default DeleteModal;

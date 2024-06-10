'use client'

import React, { useState } from 'react';
import {
    Modal, Box, Grid, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Button, Checkbox, TextField
} from '@mui/material';

interface Member {
    id: number;
    name: string;
    email: string; // Adding more fields if needed
    role: string;  // Adding more fields if needed
}

const members: Member[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager' },
    { id: 3, name: 'Tam', email: 'jane.smith@example.com', role: 'Manager' },
    { id: 4, name: 'Danh', email: 'jane.smith@example.com', role: 'Manager' },
];

interface MemberModalProps {
    open: boolean;
    onClose: () => void;
}

const MemberModal: React.FC<MemberModalProps> = ({ open, onClose }) => {
    const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
    const [searchName, setSearchName] = useState<string>('');

    const handleMemberSelect = (member: Member) => {
        setSelectedMembers((prevSelected) => {
            if (prevSelected.find((m) => m.id === member.id)) {
                return prevSelected.filter((m) => m.id !== member.id);
            } else {
                return [...prevSelected, member];
            }
        });
    };

    const isSelected = (id: number) => {
        return selectedMembers.some((member) => member.id === id);
    };

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const resetAndClose = () => {
        setSelectedMembers([]);
        onClose();
    };

    const handleSubmit = () => {
        console.log('Selected Members:', selectedMembers);
        resetAndClose();
    };


    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: '80%', margin: 'auto', marginTop: '5%', padding: 2, backgroundColor: 'white' }}>
                <Typography variant="h6" gutterBottom>
                    Thêm thành viên vào dự án
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>

                        {/* Filter */}
                        <TextField
                            label="Tìm kiếm thành viên"
                            variant="outlined"
                            fullWidth
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            sx={{ mb: 2, mt: 2 }}
                        />

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Chọn</TableCell>
                                        <TableCell>Thành viên</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredMembers.map((member) => (
                                        <TableRow
                                            key={member.id}
                                            hover
                                            onClick={() => handleMemberSelect(member)}
                                            selected={isSelected(member.id)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected(member.id)}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        handleMemberSelect(member);
                                                    }}
                                                    color="primary"
                                                />
                                            </TableCell>
                                            <TableCell>{member.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={6}>
                        {selectedMembers.length > 0 ? (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Thành viên đã được chọn</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedMembers.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell>
                                                    <Typography variant="subtitle1">Tên: {member.name}</Typography>
                                                    <Typography variant="subtitle1">Email: {member.email}</Typography>
                                                    <Typography variant="subtitle1">Vai trò: {member.role}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography variant="subtitle1">Danh sách thành viên đã được chọn</Typography>
                        )}
                        <Button onClick={resetAndClose} variant="contained" color="error" sx={{ mt: 2, mr: 1 }}>
                            Hủy
                        </Button>

                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Thêm
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Modal>
    );
};

export default MemberModal;

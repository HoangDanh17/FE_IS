'use client'

import React, { useState } from 'react';
import {
    Modal, Box, Grid, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Button, Checkbox, TextField
} from '@mui/material';

interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
}

const members: Member[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager' },
    // Add more members as needed
];

interface MemberModalProps {
    open: boolean;
    onClose: () => void;
}

const MemberModal: React.FC<MemberModalProps> = ({ open, onClose }) => {
    const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleMemberSelect = (member: Member) => {
        setSelectedMembers((prevSelected) => {
            if (prevSelected.find((m) => m.id === member.id)) {
                return prevSelected.filter((m) => m.id !== member.id);
            } else {
                return [...prevSelected, member];
            }
        });
    };

    const handleSubmit = () => {
        console.log('Selected Members:', selectedMembers);
    };

    const isSelected = (id: number) => {
        return selectedMembers.some((member) => member.id === id);
    };

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: '80%', margin: 'auto', marginTop: '5%', padding: 2, backgroundColor: 'white' }}>
                <Typography variant="h6" gutterBottom>
                    Thêm thành viên
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Tìm kiếm thành viên"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ mb: 2 }}
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
                                            <TableCell>Thông tin chi tiết</TableCell>
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
                            <Typography variant="subtitle1">Chọn thành viên để xem thông tin chi tiết</Typography>
                        )}
                        <Button 
                            onClick={handleSubmit} 
                            variant="contained" 
                            color="primary" 
                            sx={{ mt: 2 }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
};

export default MemberModal;

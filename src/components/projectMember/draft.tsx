'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
    Modal, Box, Grid, Table, TableBody, TableCell, TableContainer, Input,
    TableHead, TableRow, Paper, Typography, Button, Checkbox, CircularProgress
} from '@mui/material';
import { Search } from '@mui/icons-material';
import projectMemberApiRequest from '@/apiRequests/projectMember/projectMember';
import { MemberNotInProListResType } from '@/schemaValidations/projectMember/projectMember.schema';

type Member = {
    id: string,
    "user-name": string,
    "student-code": string,
    avatar: string,
    "ojt-semester-university": string,
    "technical_skills": string,
};

export interface FormFilterData {
    "user-name": string,
    "student-code": string,
}

function AddMemberModal({
    open,
    onClose,
    selectedProjectId,
}: {
    open: boolean;
    onClose: () => void;
    selectedProjectId: string | null;

}) {
    const [member, setMember] = useState<MemberNotInProListResType | null>(null);
    const [quantity, setQuantity] = useState(5);
    const [loading, setLoading] = useState(false);
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [dataFilter, setDataFilter] = useState<FormFilterData | null>(null);
    const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

    // Get list member not in project
    useEffect(() => {
        if (selectedProjectId) {
            projectMemberApiRequest.getMemberNotInProject(
                selectedProjectId,
                quantity,
                isFilter ? dataFilter : {}
            )
                .then(({ payload }) => {
                    setMember(payload);
                })
                .catch(error => {
                    console.error("Failed to fetch project members", error);
                });
        }
    }, [selectedProjectId, isFilter, dataFilter, quantity]);

    const [formData, setFormData] = useState<FormFilterData>({
        "user-name": "",
        "student-code": "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        setIsFilter(true);
        setDataFilter(formData);
    }

    const handleResetFilter = () => {
        setFormData({
            "user-name": "",
            "student-code": "",
        });
        setIsFilter(false);
        setDataFilter(null);
    };

    const handleLoadMore = () => setQuantity(quantity + 5);

    const resetAndClose = () => {
        onClose();
    };

    const handleSelectMember = (member: Member) => {
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
        // Handle adding selected members to the project here
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
                        <form onSubmit={handleFilter}>
                            <Grid container spacing={2} sx={{ mb: 1, mt: 2 }}>
                                <Grid item xs={3}>
                                    <Input
                                        name='user-name'
                                        placeholder="Tên thành viên"
                                        value={formData['user-name']}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Input
                                        name='student-code'
                                        placeholder="MSSV"
                                        value={formData['student-code']}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button type="submit" variant="contained" startIcon={<Search />} className='search-btn'>
                                        Search
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button className='clean-btn' onClick={handleResetFilter}>
                                        Xóa Filter
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <TableContainer component={Paper}>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Chọn</TableCell>
                                            <TableCell>Thành viên</TableCell>
                                            <TableCell>MSSV</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {member?.data.map((member) => (
                                            <TableRow key={member.id} hover>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={selectedMembers.some((m) => m.id === member.id)}
                                                        onChange={() => handleSelectMember(member)}
                                                    />
                                                </TableCell>
                                                <TableCell>{member['user-name']}</TableCell>
                                                <TableCell>{member['student-code']}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </TableContainer>
                        <div className="flex justify-center">
                            <Button onClick={handleLoadMore} style={{ marginTop: 16 }}>
                                Load More
                            </Button>
                        </div>
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
                                                    <Typography variant="subtitle1">Tên: {member['user-name']} </Typography>
                                                    <Typography variant="subtitle1">MSSV: {member['student-code']} </Typography>
                                                    <Typography variant="subtitle1">Kỳ thực tập: {member['ojt-semester-university']} </Typography>
                                                    <Typography variant="subtitle1">Kỹ năng công nghệ: {member.technical_skills} </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography variant="subtitle1">Chưa có thành viên nào được chọn</Typography>
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

export default AddMemberModal;

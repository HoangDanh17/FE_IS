'use client'
import React, { useState } from 'react';
import { Input, Button, FormControl, Grid, InputLabel, MenuItem, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "@/styles/projectMember/Filter.css"
import MemberModal from './AddMemberModal';

const FilterProjectMember: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const availableMembers = [
        { id: 1, name: 'Nguyen Van A', position: 'Developer' },
        { id: 2, name: 'Tran Thi B', position: 'Designer' },
        { id: 3, name: 'Le Van C', position: 'Tester' },
        // Add more members here
    ];

    return (
        <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={3}>
                <Card>
                    <CardContent>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Chọn Project</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Chọn Project"
                            >
                                <MenuItem value={10}>NextBean Center</MenuItem>
                                <MenuItem value={20}>Project 2</MenuItem>
                                <MenuItem value={30}>Project 3</MenuItem>
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={9}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<FilterListOutlinedIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Bộ lọc
                    </AccordionSummary>

                    <AccordionDetails>
                        <FormControl fullWidth>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth>
                                        <Typography variant='h5'>Project Manager: Phước</Typography>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth>
                                        <Typography variant='h5'>Tổng số thành viên: 15</Typography>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Button onClick={handleOpenModal} variant="contained" startIcon={<AddIcon />} className='search-btn'>
                                        Thêm thành viên
                                    </Button>
                                </Grid>

                                <Grid container item xs={12} spacing={1}>
                                    <Grid item sm={4}>
                                        < FormControl fullWidth>
                                            <Input
                                                placeholder="Tên thành viên"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item>
                                        <Button className='clean-btn'>
                                            Xóa Filter
                                        </Button>
                                    </Grid>

                                    <Grid item>
                                        <Button type="submit" variant="contained" startIcon={<Search />} className='search-btn'>
                                            Tìm kiếm
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <MemberModal open={modalOpen} onClose={handleCloseModal} />
        </Grid>
    );
};

export default FilterProjectMember;

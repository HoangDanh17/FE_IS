'use client'
import React, { useState, useEffect } from 'react';
import { Input, Button, FormControl, Grid, InputLabel, MenuItem, Typography, Autocomplete } from '@mui/material';
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
import AddMemberModal from './AddMemberModal';
import projectMemberApiRequest from '@/apiRequests/projectMember/projectMember';
import { RowData } from '../projectList/DetailCard';
import projectApiRequest from '@/apiRequests/project';
import { ProjectMemberListResType } from '@/schemaValidations/projectMember/projectMember.schema';
import TableProjectMember from './Table';
import { FormFilterData } from './AddMemberModal';

type Project = {
    id: string | number;
    name: string;
};

interface ProjectProps {
    row: RowData;
}

const FilterProjectMember: React.FC<ProjectProps> = ({ row }) => {
    const [modalOpen, setModalOpen] = useState(false);
    // List Project
    const [project, setProject] = useState<Project[]>([]);

    const [members, setMembers] = useState<ProjectMemberListResType | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [dataFilter, setDataFilter] = useState<FormFilterData | null>(null);

    const [refreshKey, setRefreshKey] = useState(0);
    const triggerRefresh = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    // Get list project to select
    useEffect(() => {
        projectApiRequest.getProject()
            .then(({ payload }) => {
                setProject(payload.data);
            })
            .catch(error => {
                console.error("Failed to fetch projects", error);
            });
    }, []);

    useEffect(() => {
        if (selectedProjectId) {
            projectMemberApiRequest.getMemberInProject(selectedProjectId)
                .then(({ payload }) => {
                    setMembers(payload);
                })
                .catch(error => {
                    console.error("Failed to fetch project members", error);
                });
        }
    }, [selectedProjectId, refreshKey]);

    console.log("listProject: ", project)

    const handleProjectChange = (event: SelectChangeEvent) => {
        setSelectedProjectId(event.target.value as string);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        triggerRefresh();
    };

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
                                onChange={handleProjectChange}
                            >
                                {project.map((project) => (
                                    <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                                ))}
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
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormControl fullWidth>
                                        <Typography variant='h5'>Project Manager: Phước</Typography>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <FormControl fullWidth>
                                        <Typography variant='h5'>Tổng số thành viên: {members?.data.length} </Typography>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <Button onClick={handleOpenModal} variant="contained" startIcon={<AddIcon />} className='search-btn'>
                                        Thêm thành viên
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <Grid sx={{ marginTop: "10px" }}>
                <TableProjectMember cardMem={members || { data: [], status: 0 }} />
            </Grid>

            <AddMemberModal
                isFilter={isFilter}
                dataFilter={dataFilter}
                open={modalOpen}
                onClose={handleCloseModal}
                selectedProjectId={selectedProjectId}
            />
        </Grid>
    );
};

export default FilterProjectMember;
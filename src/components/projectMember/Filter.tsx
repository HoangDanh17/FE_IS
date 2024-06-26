'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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
import { FormFilterData } from './AddMemberModal';
import TableProjectMember from './Table';
import { useAppContext } from '@/app/app-provider';

type Project = {
    id: string | number;
    name: string;
};

interface ProjectProps {
    row: RowData;
}

const FilterProjectMember: React.FC<ProjectProps> = ({ row }) => {
    const [modalOpen, setModalOpen] = useState(false);
    // const {project} = useAppContext();
    const [project, setProject] = useState<Project[]>([]);

    const [members, setMembers] = useState<ProjectMemberListResType | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [dataFilter, setDataFilter] = useState<FormFilterData | null>(null);

    const [refreshKey, setRefreshKey] = useState(0);
    const triggerRefresh = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const [formData, setFormData] = useState<FormFilterData>({
        "user-name": "",
        "student-code": "",
        semester: "",
        university: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsFilter(true);
        setDataFilter(formData);
    }

    const handleReset = () => {
        setFormData({
            "user-name": "",
            "student-code": "",
            semester: "",
            university: "",
        });
        setIsFilter(false);
        setDataFilter(null);
    };

    // Get list project when select
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
            projectMemberApiRequest.getMemberInProject(selectedProjectId, page + 1, rowsPerPage, isFilter ? dataFilter : {})
                .then(({ payload }) => {
                    setMembers(payload);
                })
                .catch(error => {
                    console.error("Failed to fetch project members", error);
                });
        }
    }, [selectedProjectId, refreshKey, isFilter, dataFilter, page, rowsPerPage]);

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

                <Card sx={{marginTop: 1}}>
                    <CardContent>
                        <FormControl fullWidth>
                            <Typography variant='h5'>Project Manager: Phước</Typography>
                        </FormControl>

                        <FormControl fullWidth>
                            <Typography variant='h5'>Tổng số thành viên: {members?.data.length} </Typography>
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
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
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
                                        type="email"
                                        value={formData['student-code']}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <Input
                                        name='semester'
                                        placeholder="Kỳ OJT"
                                        value={formData.semester}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <Input
                                        name='university'
                                        placeholder="Trường Đại học"
                                        value={formData.university}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid container item xs={12} sm={12} md={4} lg={4} spacing={1}>
                                    <Grid item>
                                        <Button className='clean-btn' onClick={handleReset}>
                                            Xóa Filter
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" variant="contained" startIcon={<Search />} className='search-btn'>
                                            Search
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>

                        <Grid container spacing={2} sx={{ marginTop: 1 }}>
                            <Grid item xs={12} sm={4} md={4}>
                                <Button
                                    onClick={handleOpenModal}
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    className='search-btn'
                                    disabled={!selectedProjectId}
                                >
                                    Thêm thành viên
                                </Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <Grid sx={{ marginTop: "10px" }}>
                <TableProjectMember
                    cardMem={members}
                    isFilter={isFilter}
                    dataFilter={dataFilter}
                />
            </Grid>

            <AddMemberModal
                Filter={isFilter}
                DataFilter={dataFilter}
                open={modalOpen}
                onClose={handleCloseModal}
                selectedProjectId={selectedProjectId}
            />
        </Grid>
    );
};

export default FilterProjectMember;
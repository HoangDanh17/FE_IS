'use client'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Input, Button, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Search } from '@mui/icons-material';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import "@/styles/projectMember/Filter.css"
import { ProjectMemberListResType } from '@/schemaValidations/projectMember/projectMember.schema';
import TableProjectMember, { FormFilter } from './Table';
import projectMemberApiRequest from '@/apiRequests/projectMember/projectMember';
import ButtonAdd from './Button';
interface FilterProjectMemberProps {
    selectedProjectId: string;
}

const FilterProjectMember: React.FC<FilterProjectMemberProps> = ({ selectedProjectId }) => {
    const [members, setMembers] = useState<ProjectMemberListResType | null>(null);
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [dataFilter, setDataFilter] = useState<FormFilter | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);

    const [refreshKey, setRefreshKey] = React.useState(0);
    const triggerRefresh = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const [formData, setFormData] = useState<FormFilter>({
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

    const fetchMembers = (projectId: string) => {
        setLoading(true);
        projectMemberApiRequest.getMemberInProject(projectId, page + 1, rowsPerPage, isFilter ? dataFilter : {})
            .then(({ payload }) => {
                setMembers(payload);
            })
            .catch(error => {
                console.error("Failed to fetch project members", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (selectedProjectId) {
            fetchMembers(selectedProjectId);
        }
    }, [selectedProjectId, page, rowsPerPage, isFilter, dataFilter, refreshKey]);

    return (
        <div>
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
                                    value={formData['student-code']}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            {/* <Grid item xs={3}>
                                <Input
                                    name='semester'
                                    placeholder="Kỳ OJT"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid> */}
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
                                <Grid item xs={6}>
                                    <Button fullWidth type="submit" variant="contained" startIcon={<Search />} className='search-btn'>
                                        Search
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth className='clean-btn' onClick={handleReset}>
                                        Xóa Filter
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </AccordionDetails>
            </Accordion>

            <Grid sx={{ marginTop: "10px" }}>
                <TableProjectMember
                    cardMem={members}
                    isFilter={isFilter}
                    dataFilter={dataFilter}
                    selectedProjectId={selectedProjectId}
                />

                {/* ButtonAdd Component */}
                <ButtonAdd
                    triggerRefresh={triggerRefresh}
                    selectedProjectId={selectedProjectId}
                    isFilter={isFilter}
                    dataFilter={dataFilter}
                />
            </Grid>
        </div>
    );
};

export default FilterProjectMember;
'use client'
import React from 'react';
import { Input, Button, FormControl, Grid, CardContent, Collapse, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
const FilterProjectMember = () => {
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
                    <FormControl fullWidth>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <Input
                                        placeholder="ID dự án"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <Input
                                        placeholder="ID thành viên"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <Input
                                        placeholder="Ngày tham gia"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <Input
                                        placeholder="Trạng thái"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid container item xs={12} sm={12} md={4} lg={4}  spacing={1}>
                                <Grid item>
                                    <Button className='clean-btn'>
                                        Clean Filter
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" startIcon={<Search />} className='search-btn'>
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FilterProjectMember;

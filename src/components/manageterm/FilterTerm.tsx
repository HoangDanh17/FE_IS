import React from 'react';
import { Card, Input, Button, FormControl, Grid, MenuItem, Select, Typography, CardContent } from '@mui/material';
import { Search } from '@mui/icons-material';

const Filter = () => {
    return (
        <Card sx={{ minWidth: 300 }}>
            <CardContent  
                style={{ height: 'px' }}>
                <FormControl>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <Input
                                    placeholder="Semester"
                                    type="Semester"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <Input
                                    placeholder="University"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <Input
                                    placeholder="Start Date"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <Input
                                    placeholder="End Date"
                                />
                            </FormControl>
                        </Grid>
                

                        <Grid item xs={12} sm={3}>
                            <Button type="submit" variant="contained" startIcon={<Search />} className='search-btn'>
                                Search
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <Button className='clean-btn'>
                                Clean Filter
                            </Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </CardContent>
        </Card >
    );
};

export default Filter;

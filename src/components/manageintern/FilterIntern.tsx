"use client"; // Add this line at the top

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, Input, Button, FormControl, Grid, CardContent } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/navigation'; // Use next/navigation
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InternTable, { FormFilterData, RowData } from './InternTable';

const Filter: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState<FormFilterData>({
        'user-name': "",
        email: "",
        "student-code": "",
        'ojt-semester': "",
        gender: "",
        'phone-number': "",
        address: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (name: string, date: Dayjs | null) => {
        setFormData({
            ...formData,
            [name]: date ? date.format("YYYY-MM-DD") : null,
        });
    };

    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [dataFilter, setDataFilter] = useState<FormFilterData | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData); // Added console.log
        setIsFilter(true);
        setDataFilter(formData);
    };

    const handleReset = () => {
        setFormData({
            'user-name': "",
            email: "",
            'student-code': "",
            'ojt-semester': "",
            gender: "",
            'phone-number': "",
            address: "",
        });
        setIsFilter(false);
        setDataFilter(null);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Card sx={{ minWidth: 300 }}>
                    <CardContent style={{ height: 'px' }}>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth>
                                            <Input
                                                name="user-name"
                                                placeholder="Username"
                                                value={formData['user-name']}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth>
                                            <Input
                                                name="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth>
                                            <Input
                                                name="student-code"
                                                placeholder="Student Code"
                                                value={formData['student-code']}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth>
                                            <Input
                                                name="ojt-semester"
                                                placeholder="OJT Semester"
                                                value={formData['ojt-semester']}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth>
                                            <Input
                                                name="gender"
                                                placeholder="Gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth>
                                            <Input
                                                name="phone-number"
                                                placeholder="Phone Number"
                                                value={formData['phone-number']}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth>
                                            <Input
                                                name="address"
                                                placeholder="Address"
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Button type="submit" variant="contained" startIcon={<Search />} className='search-btn'>
                                            Search
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Button type="button" onClick={handleReset} className='clean-btn'>
                                            Clean Filter
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </form>
                    </CardContent>
                </Card>
            </LocalizationProvider>
            <InternTable
                isFilter={isFilter}
                dataFilter={dataFilter}
                handleReset={handleReset} />
        </>
    );
};

export default Filter;

import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Star as StarIcon, Home as HomeIcon, Work as WorkIcon, School as SchoolIcon } from '@mui/icons-material';

const cards = [
    { title: 'Card 1', description: 'Description for card 1', icon: <StarIcon /> },
    { title: 'Card 2', description: 'Description for card 2', icon: <HomeIcon /> },
    { title: 'Card 3', description: 'Description for card 3', icon: <WorkIcon /> },
    { title: 'Card 4', description: 'Description for card 4', icon: <SchoolIcon /> }
];

const ProjectDetailLayout = () => {
    return (
        <Grid container spacing={2} justifyContent="center">
            {cards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card>
                        <CardContent style={{height:150}}>
                            <Grid container direction="column" alignItems="center" style={{marginTop:20}}>
                                <Grid item>
                                    {card.icon}
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" component="div" style={{textAlign:"center"}}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectDetailLayout;

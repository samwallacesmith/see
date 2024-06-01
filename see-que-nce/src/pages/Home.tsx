// src/pages/Home.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import FullWidthSlider from '../components/FullWidthSlider';
import MovieList from '../components/MovieList';

const Home: React.FC = () => {
    return (
        <>
            <FullWidthSlider />
            <Container>
                <Box id="movies" my={4}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Movie List
                    </Typography>
                    <MovieList />
                </Box>
            </Container>
        </>
    );
};

export default Home;

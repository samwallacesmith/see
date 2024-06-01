import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { getMovies } from '../services/api';
import styles from './FullWidthSlider.module.scss';

interface Movie {
    id: number;
    attributes: {
        title: string;
        release_date: string;
        poster: { 
            data: {
                attributes: {
                    url: string;
                };
            };
        };
    };
}

const FullWidthSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await getMovies();
            setMovies(moviesData.data);
        };

        fetchMovies();
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
    };

    if (movies.length === 0) {
        return <div>Loading...</div>;
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    return (
        <Container>
            <Box className={styles.slider}>
                <IconButton className={styles.navButton} onClick={handlePrev}>
                    <ArrowBackIos />
                </IconButton>
                <Box className={styles.imageContainer}>
                    <img
                        src={`${baseUrl}${movies[currentIndex].attributes.poster.data.attributes.url}`}
                        alt={`Slide ${currentIndex}`}
                        className={styles.image}
                    />
                    <div className={styles.copy}>
                        <div className={styles.copy__inner}>
                            <Typography variant="h5" className={styles.title}>
                                {movies[currentIndex].attributes.title}    
                            </Typography>

                            <Typography variant="body1" className={styles.date}>
                                {new Date(movies[currentIndex].attributes.release_date).toLocaleDateString()}
                            </Typography>
                        </div>
                    </div>
                </Box>
                <IconButton className={styles.navButton} onClick={handleNext}>
                    <ArrowForwardIos />
                </IconButton>
            </Box>
        </Container>
    );
};

export default FullWidthSlider;

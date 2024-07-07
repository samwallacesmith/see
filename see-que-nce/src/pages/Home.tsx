import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { getMovies, getLatestReviews, getTopRatedMovies, getUpcomingMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import ReviewCard from '../components/ReviewCard';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedReview from '../components/FeaturedReview'; // Import the new component

const HomePage: React.FC = () => {
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [latestReviews, setLatestReviews] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const featured = await getMovies({ featured: true });
                const latest = await getLatestReviews();
                const topRated = await getTopRatedMovies();
                const upcoming = await getUpcomingMovies();
                setFeaturedMovies(featured.data || []);
                setLatestReviews(latest.data || []);
                setTopRatedMovies(topRated.data || []);
                setUpcomingMovies(upcoming.data || []);
            } catch (error) {
                console.error("Error fetching content: ", error);
            }
        };
        fetchContent();
    }, []);

    return (
        <Container>
            {/* Featured Review Section */}
            <Box mb={4}>
                <FeaturedReview />
            </Box>

            {/* Latest Reviews */}
            <Typography variant="h4" gutterBottom>Latest Reviews</Typography>
            <Grid container spacing={4}>
                {latestReviews.map(review => (
                    <Grid item key={review.id} xs={12} sm={6} md={4}>
                        <ReviewCard review={review} />
                    </Grid>
                ))}
            </Grid>

            {/* Top Rated Movies */}
            <Typography variant="h4" gutterBottom>Top Rated Movies</Typography>
            <Grid container spacing={4}>
                {topRatedMovies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {/* Upcoming Movies */}
            <Typography variant="h4" gutterBottom>Upcoming Movies</Typography>
            <Grid container spacing={4}>
                {upcomingMovies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;

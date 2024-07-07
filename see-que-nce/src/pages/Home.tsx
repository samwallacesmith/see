import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { getMovies, getLatestReviews, getTopRatedMovies, getUpcomingMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import ReviewCard from '../components/ReviewCard';
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
        <Container className='py-4'>
            <div className='row'>
                <div className='col-md-8'>
                    {/* Featured Review Section */}
                    <Box mb={4}>
                        <FeaturedReview />
                    </Box>
                </div>

                <div className='col-md-4'>
                    {/* Latest Reviews */}
                    <Typography variant="h4" gutterBottom>Latest Reviews</Typography>
                    {latestReviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>

            <div className='row pb-4'>
                <div className='col-12'>
                    {/* Top Rated Movies */}
                    <Typography variant="h4" gutterBottom>Top Rated Movies</Typography>
                    <Grid container spacing={4}>
                        {topRatedMovies.map(movie => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4}>
                                <MovieCard movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>

            <div className='row'>
                <div className='col-12'>
                    {/* Upcoming Movies */}
                    <Typography variant="h4" gutterBottom>Upcoming Movies</Typography>
                    <Grid container spacing={4}>
                        {upcomingMovies.map(movie => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4}>
                                <MovieCard movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </Container>
    );
};

export default HomePage;

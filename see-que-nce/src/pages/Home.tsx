import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { getMovies, getLatestReviews, getTopRatedMovies, getUpcomingMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import ReviewCard from '../components/ReviewCard';
import FeaturedReview from '../components/FeaturedReview';

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
                    <Box mb={4}>
                        <FeaturedReview />
                    </Box>
                </div>
                <div className='col-md-4'>
                    <h4>Latest Reviews</h4>
                    {latestReviews.map(review => (
                        <Link to={`/article/reviews/${review.id}`} key={review.id}>
                            <ReviewCard review={review} />
                        </Link>
                    ))}
                </div>
            </div>
            <h4>Top Rated Movies</h4>
            <Grid container spacing={4}>
                {topRatedMovies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Link to={`/article/movies/${movie.id}`} key={movie.id}>
                            <MovieCard movie={movie} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <h4>Upcoming Movies</h4>
            <Grid container spacing={4}>
                {upcomingMovies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Link to={`/article/movies/${movie.id}`} key={movie.id}>
                            <MovieCard movie={movie} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;

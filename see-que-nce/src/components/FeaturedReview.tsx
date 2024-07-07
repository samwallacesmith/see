import React, { useEffect, useState } from 'react';
import { CardMedia, CardContent, Typography, Box } from '@mui/material';
import { getFeaturedReview } from '../services/api';

const FeaturedReview = () => {
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchFeaturedReview = async () => {
            const response = await getFeaturedReview();
            if (response.data.length > 0) {
                setReview(response.data[0]);
            } else {
                setReview(null);
            }
        };

        fetchFeaturedReview();
    }, []);

    if (!review) {
        return <div>No featured review available.</div>;
    }

    const movie = review.attributes.movie.data.attributes;
    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
    const posterUrl = movie.poster?.data?.attributes?.url
        ? `${baseUrl}${movie.poster.data.attributes.url}`
        : 'path/to/placeholder/image.jpg';

    return (
        <Box className="featured-review" sx={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#f0f0f0' }}>
            <CardMedia
                component="img"
                alt={movie.title}
                image={posterUrl}
                onError={(e) => (e.currentTarget.src = 'path/to/placeholder/image.jpg')}
                sx={{ width: '300px', height: 'auto', marginRight: '20px' }}
            />
            <CardContent>
                <Typography variant="h1" component="h1" gutterBottom>
                    {review.attributes.Title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {review.attributes.Content}
                </Typography>
            </CardContent>
        </Box>
    );
};

export default FeaturedReview;
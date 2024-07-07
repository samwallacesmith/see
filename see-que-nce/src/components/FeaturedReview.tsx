import React, { useEffect, useState } from 'react';
import { getFeaturedReview } from '../services/api';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

const FeaturedReview = () => {
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await getFeaturedReview();
                if (response.data.length > 0) {
                    setReview(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching featured review:', error);
            }
        };

        fetchReview();
    }, []);

    if (!review || !review.attributes) {
        return <p>No featured review available.</p>;
    }

    const reviewData = review.attributes;
    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
    const posterUrl = reviewData.poster?.data?.attributes?.url
        ? `${baseUrl}${reviewData.poster.data.attributes.url}`
        : 'path/to/placeholder/image.jpg';

    // Extract the first paragraph
    const firstParagraph = reviewData.content.find(block => block.type === 'paragraph')?.children[0].text;

    return (
        <Box mb={4}>
            <Card>
                <CardMedia
                    component="img"
                    alt={reviewData.title}
                    height="300"
                    image={posterUrl}
                    onError={(e) => (e.currentTarget.src = 'path/to/placeholder/image.jpg')}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {reviewData.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {firstParagraph}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default FeaturedReview;

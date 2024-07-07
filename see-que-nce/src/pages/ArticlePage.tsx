import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleDetails } from '../services/api'; // Make sure this path is correct
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

const ArticlePage = () => {
    const { type, id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await getArticleDetails(type, id);
                setArticle(response.data);
            } catch (error) {
                console.error(`Error fetching ${type} details:`, error);
            }
        };

        fetchArticle();
    }, [type, id]);

    if (!article || !article.attributes) {
        return <p>Loading...</p>;
    }

    const articleData = article.attributes;
    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
    const posterUrl = articleData.poster?.data?.attributes?.url
        ? `${baseUrl}${articleData.poster.data.attributes.url}`
        : 'path/to/placeholder/image.jpg';

    return (
        <Box mb={4}>
            <Card>
                <CardMedia
                    component="img"
                    alt={articleData.title}
                    height="300"
                    image={posterUrl}
                    onError={(e) => (e.currentTarget.src = 'path/to/placeholder/image.jpg')}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {articleData.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {articleData.content}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ArticlePage;

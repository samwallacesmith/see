import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { truncateText } from '../utils/utils'; 
import styles from './ReviewCard.module.scss';

const ReviewCard = ({ review }) => {
    if (!review || !review.attributes || !review.attributes.movie || !review.attributes.movie.data || !review.attributes.movie.data.attributes) {
        console.error('Invalid review object:', review);
        return null;
    }

    console.log('Review Data:', review);

    const reviewData = review.attributes;
    const movie = reviewData.movie.data.attributes;
    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
    const posterUrl = movie.poster?.data?.attributes?.url
        ? `${baseUrl}${movie.poster.data.attributes.url}`
        : 'path/to/placeholder/image.jpg';

    const maxLength = 100; // Set the max length for the content

    return (
        <Card className={styles.reviewCard}>
            <CardMedia
                component="img"
                alt={movie.title}
                height="140"
                image={posterUrl}
                onError={(e) => (e.currentTarget.src = 'path/to/placeholder/image.jpg')}
            />
            <CardContent>
                <Typography className={styles.title} gutterBottom variant="h5" component="div">
                    {reviewData.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {truncateText(reviewData.Content, maxLength)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;

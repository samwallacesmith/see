import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { truncateText } from '../utils/utils'; 
import styles from './ReviewCard.module.scss';

const ReviewCard = ({ review }) => {
    if (!review || !review.attributes) {
        console.error('Invalid review object:', review);
        return null;
    }

    const reviewData = review.attributes;
    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
    const posterUrl = reviewData.poster?.data?.attributes?.url
        ? `${baseUrl}${reviewData.poster.data.attributes.url}`
        : 'path/to/placeholder/image.jpg';

    const maxLength = 100;

    console.log('Review Data:', reviewData);
    console.log('Poster URL:', posterUrl);

    return (
        <Card className={styles.reviewCard}>
            <CardMedia
                component="img"
                alt={reviewData.title}
                height="140"
                image={posterUrl}
                onError={(e) => (e.currentTarget.src = 'path/to/placeholder/image.jpg')}
            />
            <CardContent>
                <Typography className={styles.title} gutterBottom variant="h5" component="div">
                    {reviewData.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {truncateText(reviewData.content.map(block => block.children[0].text).join(' '), maxLength)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;

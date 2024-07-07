import { Card, CardMedia, CardContent, Typography } from '@mui/material';

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

	return (
		<Card>
			<CardMedia
				component="img"
				alt={movie.title}
				height="140"
				image={posterUrl}
				onError={(e) => (e.currentTarget.src = 'path/to/placeholder/image.jpg')}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{reviewData.Title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{reviewData.Content}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ReviewCard;

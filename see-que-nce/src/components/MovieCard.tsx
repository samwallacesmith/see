import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { truncateText } from '../utils/utils'; 

const MovieCard = ({ movie }) => {
    if (!movie || !movie.attributes) {
        return null;
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
    const posterUrl = movie.attributes.poster?.data?.attributes?.url
        ? `${baseUrl}${movie.attributes.poster.data.attributes.url}`
        : 'path/to/placeholder/image.jpg';

    const maxLength = 100;

    return (
        <Card>
            <CardMedia
                component="img"
                alt={movie.attributes.title}
                height="140"
                image={posterUrl}
                onError={(e) => (e.currentTarget.src = 'path/to/placeholder/image.jpg')}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {movie.attributes.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {truncateText(movie.attributes.description, maxLength)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Release Date: {new Date(movie.attributes.release_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rating: {movie.attributes.rating}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MovieCard;


import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HeroCarousel = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return <div>No featured movies available</div>;
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    return (
        <Carousel>
            {movies.map(movie => (
                <div key={movie.id}>
                    <img
                        src={`${baseUrl}${movie.attributes.poster?.data?.attributes?.url}`}
                        alt={movie.attributes.title}
                        onError={(e) => (e.currentTarget.src = 'path/to/placeholder/image.jpg')}
                    />
                    <p className="legend">{movie.attributes.title}</p>
                </div>
            ))}
        </Carousel>
    );
};

export default HeroCarousel;

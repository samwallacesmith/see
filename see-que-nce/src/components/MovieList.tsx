import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/api';

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesData = await getMovies();
                setMovies(moviesData.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.attributes.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;

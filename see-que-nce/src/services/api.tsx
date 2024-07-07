import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getMovies = async (params = {}) => {
	try {
		const response = await api.get('/movies', { params: { ...params, populate: '*' } });
		return response.data;
	} catch (error) {
		console.error("Error fetching movies:", error);
		return { data: [] };
	}
};

export const getLatestReviews = async () => {
	try {
		const response = await api.get('/reviews?_sort=createdAt:desc&_limit=5&populate=movie.poster');
		return response.data;
	} catch (error) {
		console.error("Error fetching latest reviews:", error);
		return { data: [] };
	}
};

export const getTopRatedMovies = async () => {
	try {
		const response = await api.get('/movies?_sort=rating:desc&_limit=5&populate=*');
		return response.data;
	} catch (error) {
		console.error("Error fetching top rated movies:", error);
		return { data: [] };
	}
};

export const getUpcomingMovies = async () => {
	try {
		const response = await api.get('/movies', {
			params: {
				filters: {
					release_date: {
						$gte: new Date().toISOString(),
					},
				},
				populate: '*',
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching upcoming movies:", error);
		return { data: [] };
	}
};

export const getFeaturedReview = async () => {
	try {
		const response = await api.get('/reviews', {
			params: {
				filters: {
					featured: true,
				},
				populate: 'movie.poster',
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching featured review:", error);
		return { data: [] };
	}
};

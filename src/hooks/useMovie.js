import axios from 'axios';
import { useState, useEffect } from 'react';

const useMovie = (id) => {
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await axios.get(`/api/movies/id/${id}`);
                setMovie(data);
                setError('');
            } catch(err) {
                setError(err);
            }
        };

        fetchMovie();
    }, [id]);

    return { movie, error };
}

export default useMovie;
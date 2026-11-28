import axios from 'axios';
import { useState, useEffect } from 'react';

const useListItems = (id) => {
    const [listItems, setListItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchListItems = async () => {
            try {
                const { data } = await axios.get(`/api/lists/${id}/movies`);
                setListItems(data);
                setError('');
            } catch(err) {
                setError(err);
            }
        };

        fetchListItems();
    }, [id]);

    return { listItems, error };
}

export default useListItems;
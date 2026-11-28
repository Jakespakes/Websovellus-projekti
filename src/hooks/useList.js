import axios from 'axios';
import { useState, useEffect } from 'react';

const useLists = () => {
    const [lists, setLists] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const { data } = await axios.get(`/api/lists/`);
                
                setLists([
                    ...(data.personalLists),
                    ...(data.groupLists)
                ]);

                setError(null);
            } catch (err) {
                setError(err);
            }
        };

        fetchLists();
    }, []);

    return { lists, error };
};

export default useLists;
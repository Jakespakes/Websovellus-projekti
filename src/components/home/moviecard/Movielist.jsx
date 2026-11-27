import { useState } from 'react';
import axios from 'axios';

export default function Movielist({ movieId }) {
    const [open, setOpen] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [selectedListId, setSelectedListId] = useState(0);
    const [response, setResponse] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [listsLoaded, setListsLoaded] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const checkForLists = async () => {
        setOpen(true);

        try {
            const { data } = await axios.get('/api/lists/', {
                withCredentials: true
            });
            
            const lists = [
                ...(data.personalLists ?? []),
                ...(data.groupLists ?? [])
            ];

            setMovieList(lists);
            setSelectedListId(lists[0]?.id ?? "");
            setListsLoaded(true);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `/api/lists/${selectedListId}/movies`,
                { movieId },
                { withCredentials: true }
            );

            setResponse(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleCreateNewList(e) {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `/api/lists/`,
                { name, description, isPublic },
                { withCredentials: true }
            );

            setResponse(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <button type="button" onClick={() => checkForLists()}>
                Lisää listaan
            </button>

            {open && movieList.length === 0 && listsLoaded && (
                <div>
                    <p>Sinulla ei ole yhtään listoja, haluatko tehdä yhden?</p>
                    <button type="button" onClick={() => setShowCreateForm(true)}>
                        Tee lista
                    </button>
                </div>
            )}

            {showCreateForm && (
                <form onSubmit={handleCreateNewList}>
                    <input 
                        placeholder="Listan nimi"
                        type="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        placeholder="Listan kuvaus"
                        type="description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br></br>
                    <input
                        type="checkbox"
                        id="isPublic"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    <label htmlFor="isPublic">Haluatko listasta julkisen?</label>
                    <br></br>
                    <button type="submit">
                        Luo lista
                    </button>
                    {response && <p>{response.message}</p>}
                </form>
            )}

            {open && listsLoaded && movieList.length > 0 && ( 
                <form onSubmit={handleSubmit}>
                    <select 
                        name="movie-list"
                        value={selectedListId}
                        onChange={(e) => setSelectedListId(Number(e.target.value))}
                    >
                        {movieList.map((list) => (
                            <option key={list.id} value={list.id}>
                                {list.name}
                            </option>
                        ))}
                    </select>
                    <button type='submit'>
                        Lisää
                    </button>
                    {response && <p>{response.message}</p>}
                </form>
            )}
        </div>
    );
}
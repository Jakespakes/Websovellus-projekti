import './Profilepage.css';
import useLists from '../../../hooks/useList.js';
import useListItems from '../../../hooks/useListItems.js';
import useMovie from '../../../hooks/useMovie.js';

function MovieListItem({ item }) {
    const { movie, error } = useMovie(item.movie_id);

    if (error) return (
        <p className="error-message">
            Elokuvan lataaminen epäonnistui {error.message}
        </p>
    );

    return (
        <div className="movie-list-item">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Elokuvan juliste"
            />
            <p>{movie.title}</p>
        </div>
    );
}

function MovieList({ list }) {
    const { listItems, error } = useListItems(list.id);

    if (error) return (
        <p className="error-message">
            Elokuvan lataaminen epäonnistui: {error.message}
        </p>
    )

    return (
        <article className="list-item">
            <h4>{list.name}</h4>
            <p>{list.description}</p>
            <p>Julkinen: 
                {list.is_public ? "Kyllä" : "Ei"}
            </p>
            <p>Listan elokuvat:</p>
            {listItems.length === 0 ? (
                <h3>Ei ole vielä elokuvia</h3>
            ) : (
                listItems.map((item) => (
                    <MovieListItem key={item.id} item={item} />
                ))
            )}
        </article>
    );
}

export default function Profilepage({ user }) {
    const { lists, error } = useLists();

    if (error) return (
        <p className="error-message">
            Listojen haku epäonnistui: {error.message}
        </p>
    );

    return (
        <section className="profile-page">
            <div>
                <h2>Käyttäjän tiedot</h2>
                <p>Käyttäjänimi: {user.username}</p>
                <p>Sähköposti: {user.email}</p>
                <p>Sinun listat</p>
                <div className="list-listing">
                    {lists.map((list) => (
                        <MovieList key={list.id} list={list} />
                    ))}
                </div>
            </div>
        </section>
    );
}
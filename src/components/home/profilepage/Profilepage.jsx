import './Profilepage.css';
import useLists from '../../../hooks/useList.js';
import useListItems from '../../../hooks/useListItems.js';

export default function Profilepage({ user }) {
    const { lists, listError } = useLists();
    const { listItems, listItemError } = useListItems(user.id);

    if (listError) return (
        <p className="error-message">{error.message}</p>
    );

    if (listItemError) return (
        <p classname="error-message">{errorMonitor.message}</p>
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
                        <article className="list-item" key={list.id}>
                            <h4>{list.name}</h4>
                            <p>{list.description}</p>
                            <p>Julkinen: {list.is_public ? "Kyllä" : "Ei"}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
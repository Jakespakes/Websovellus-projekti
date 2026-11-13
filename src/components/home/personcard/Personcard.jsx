import "./Personcard.css";

export default function Personcard({ data }) {
    return (
        <section>
            {data.map((person) => (
                <div key={person.id} className="personcard">
                    {person.profile_path ? (
                        <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} />
                    ):(
                        <p className="no-profile">No picture availible</p>
                    )}
                    <div className="person-details">
                        <h2 className="person-name">{person.original_name}</h2>
                    </div>
                </div>
            ))}
        </section>
    );
}
import { useState } from "react"
import Personmodal from "./Personmodal";
export default function Personcard({ data, knownFor }) {
    const [selectedPerson, setSelectedPerson] = useState(null)
    const handlePersonClick = (person) => {
        console.log(person)
        setSelectedPerson(person)
        
    }

    return (
        <>
            <section>
                {data.map((person) => (
                    <div key={person.id} className="personcard">
                        {person.profile_path ? (
                            <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                                onClick={() => handlePersonClick(person)}
                            />
                        ) : (
                            <p className="no-profile">Kuvaa ei saatavilla</p>
                        )}
                        <div className="person-details">
                            <h2 className="person-name" onClick={() => handlePersonClick(person)}>{person.original_name}</h2>
                        </div>
                    </div>
                ))}
            </section>

            {selectedPerson && (
                <Personmodal
                    person={selectedPerson}
                    onClose={() => setSelectedPerson(null)} />
            )}
        </>
    );
}
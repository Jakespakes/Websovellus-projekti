import { useParams } from 'react-router-dom'
import './GroupSite.css'
import { useState, useEffect } from 'react'

function GroupSite() {
  // Get the group ID from the URL.
  const { groupID } = useParams()
  const [group, setGroup] = useState(null)
  const [members, setMembers] = useState([])
  useEffect(() => {
    // Fetch the group using the ID from the URL.
    fetch(`/api/groups/${groupID}`, {
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ryhmän tietojen hakeminen epäonnistui');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched group:', data);
        setGroup(data);
    })
    .catch(error => {
        console.error('Error fetching group:', error);
    });
}, [groupID]);
useEffect(() => {
    // Fetch the members belonging to this group.
    fetch(`/api/groups/${groupID}/members`, {
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Jäsenten hakeminen epäonnistui');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched members:', data);
        setMembers(data);
    })
    .catch(error => {
        console.error('Error fetching members:', error);
    });
}, [groupID]);

    return (
    <div className="group-site">
        

      {/* Group information at the top of the page */}
      <section className="group-header">
        <h1>{group ? group.name : 'Ladataan ryhmää...'}</h1>
        <p>{group ? group.description : ''}</p>
        <p>Ryhmän ID: {groupID}</p>
      </section>

      

      {/* Navigation between different group sections */}
      <nav className="group-navigation">
        <button>Ryhmän home-page</button>
        <button>Jäsenet</button>
        <button>Ryhmänhallinta</button>
      </nav>

      {/* Main content of the selected group */}
      <main className="group-content">
        <h2>Elokuva-arvostelut</h2>
        <p>Arvostelut tulee tähän</p>
      </main>

      {/* Display the members of this group */}
      <section className="group-members">
        <h2>Ryhmän jäsenet</h2>

        {members.length === 0 ? (
            <p>Ryhmällä ei ole vielä jäseniä.</p>
        ) : (
        <ul className="group-members-list">
            {members.map(member => (
                <li key={member.id}>
                    <strong>{member.username}</strong>
                    <span> – {member.role}</span>
                </li>
            ))}
        </ul>
    )}
    </section>

    </div>
  )
}

export default GroupSite
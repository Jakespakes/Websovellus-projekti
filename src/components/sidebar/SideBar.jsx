// import { useEffect, useState } from "react";
// import axios from "axios";
import "./SideBar.css";

export default function SideBar() {
    const isLoggedIn = false;

    return (
        <aside className="SideBar">

            {!isLoggedIn && (
                <div className="guestPanel">
                    <h3>Testi</h3>
                    <p>
                        Kirjaudu sisään tai luo käyttäjä
                    </p>

                    <button className="loginButton">
                        Kirjaudu
                    </button>
                    <button className="registerButton">
                        Rekisteröidy
                    </button>
                </div>)}
        </aside>
    );
}


//     const [groups, setGroups] = useState([]);

//     useEffect(() => {
//         fetchGroups();
//     }, []);

//     async function FetchGroups() {
//     try {
//         const response = await axios.get("/")
//         setGroups(response.data);
//     } catch (error) {
//         console.error(error);
//      }
//     }
//     return (
//     <aside className="SideBar">
//       {groups.map((group) => (
//         <div className="groupCard" key={group.id}>
//           <img
//             src={group.image}
//             alt={group.name}
//             className="groupImage"
//           />

//           <span>{group.name}</span>
//         </div>
//       ))}
//     </aside>
//     );
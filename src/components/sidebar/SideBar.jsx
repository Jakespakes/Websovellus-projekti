// import { useEffect, useState } from "react";
// import axios from "axios";
import "./SideBar.css";

export default function SideBar({onLoginClick, onRegisterClick, onCreateGroupClick, user }) {
    const isLoggedIn = false;

    return (
        <aside className="SideBar">

            {!user ? (
                <div className="guestPanel">
                    <h3>Testi</h3>
                    <p/>
    
                    <button className="login-button"
                        onClick={onLoginClick}>
                        Login
                    </button>
                    <button className="registerButton"
                        onClick={onRegisterClick}>
                        Register
                    </button>
                </div>
                ) : (
                    <div className="userPanel">
                        <h3>Tervetuloa, {user.username}!</h3>
                        <p>Olet kirjautuneenä sisään.</p>
                        <button
                            className="CreateGroupButton"
                            onClick={onCreateGroupClick}
                        >
                            Create a group
                        </button>
                    </div>
                )}
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
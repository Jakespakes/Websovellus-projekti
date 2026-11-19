import { useEffect, useState } from "react";
import axios from "axios";
import "./SideBar.css";

export default function SideBar({
    onLoginClick,
    onRegisterClick,
    onCreateGroupClick,
    user,
    refreshTrigger,
    isOpen
}) {

    const [groups, setGroups] = useState([]);

    const isLoggedIn = false;


    useEffect(() => {

        if (user) {
            fetchGroups();
        }
        else {
            // Clear groups when the user logs out
            setGroups([]);
        }
    }, [user, refreshTrigger]);

    async function fetchGroups() {
        try {
            const response = await axios.get("/api/groups/my-groups", {
                withCredentials: true
            });
            setGroups(response.data);
        } catch (error) {
            console.error("Ryhmien haku epäonnistui:", error);
        }
    }

    return (
        <aside className={`SideBar ${isOpen ? "open" : ""}`}>

            {!user ? (
                <div className="guestPanel">
                    <h3>Testi</h3>
                    <p />

                    <button className="login-button"
                        onClick={onLoginClick}>
                        Kirjaudu sisään
                    </button>
                    <button className="registerButton"
                        onClick={onRegisterClick}>
                        Rekisteröidy
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
                        Luo ryhmä
                    </button>
                    <div className="groupList">
                        <h4>Omat ryhmät</h4>
                        {groups.length > 0 ? (
                            groups.map((group) => (
                                <div className="groupCard" key={group.id}>
                                    {group.name}
                                </div>
                            ))
                        ) : (
                            <p>Et kuulu vielä yhteenkään ryhmään.</p>)}
                    </div>
                </div>
            )}

        </aside>
    );
}
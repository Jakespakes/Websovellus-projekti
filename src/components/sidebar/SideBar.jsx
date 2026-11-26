import { useEffect, useState } from "react";
import axios from "axios";
import "./SideBar.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function SideBar({
    onLoginClick,
    onRegisterClick,
    onCreateGroupClick,
    user,
    refreshTrigger,
    isOpen,
    onClose
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
        <>
            {/* Desktop sidebar */}

            <aside className="SideBar d-none d-md-block">

                {!user ? (

                    <Card className="sidebar-card">

                        <Card.Body>

                            <Card.Title>
                                Tervetuloa
                            </Card.Title>

                            <Button
                                variant="primary"
                                className="w-100 mb-2"
                                onClick={onLoginClick}
                            >
                                Kirjaudu sisään
                            </Button>

                            <Button
                                variant="secondary"
                                className="w-100"
                                onClick={onRegisterClick}
                            >
                                Rekisteröidy
                            </Button>

                        </Card.Body>

                    </Card>

                ) : (

                    <Card className="sidebar-card">

                        <Card.Body>

                            <Card.Title>
                                Tervetuloa, {user.username}
                            </Card.Title>

                            <Button
                                variant="success"
                                className="w-100"
                                onClick={onCreateGroupClick}
                            >
                                Luo ryhmä
                            </Button>

                        </Card.Body>

                        <ListGroup variant="flush">

                            <ListGroup.Item>
                                <strong>Omat ryhmät</strong>
                            </ListGroup.Item>

                            {groups.length > 0 ? (
                                groups.map((group) => (
                                    <ListGroup.Item key={group.id}>
                                        {group.name}
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item>
                                    Et kuulu vielä yhteenkään ryhmään.
                                </ListGroup.Item>
                            )}

                        </ListGroup>

                    </Card>

                )}

            </aside>

            {/* Mobile sidebar */}

            <Offcanvas
                show={isOpen}
                onHide={onClose}
                placement="start"
                className="mobile-SideBar"
            >

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Valikko
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>

                    {!user ? (

                        <Card className="sidebar-card">

                            <Card.Body>

                                <Card.Title>
                                    Tervetuloa
                                </Card.Title>

                                <Button
                                    variant="primary"
                                    className="w-100 mb-2"
                                    onClick={onLoginClick}
                                >
                                    Kirjaudu sisään
                                </Button>

                                <Button
                                    variant="secondary"
                                    className="w-100"
                                    onClick={onRegisterClick}
                                >
                                    Rekisteröidy
                                </Button>

                            </Card.Body>

                        </Card>

                    ) : (

                        <Card className="sidebar-card">

                            <Card.Body>

                                <Card.Title>
                                    Tervetuloa, {user.username}
                                </Card.Title>

                                <Button
                                    variant="success"
                                    className="w-100"
                                    onClick={onCreateGroupClick}
                                >
                                    Luo ryhmä
                                </Button>

                            </Card.Body>

                            <ListGroup variant="flush">

                                <ListGroup.Item>
                                    <strong>Omat ryhmät</strong>
                                </ListGroup.Item>

                                {groups.length > 0 ? (
                                    groups.map((group) => (
                                        <ListGroup.Item key={group.id}>
                                            {group.name}
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item>
                                        Et kuulu vielä yhteenkään ryhmään.
                                    </ListGroup.Item>
                                )}

                            </ListGroup>

                        </Card>

                    )}

                </Offcanvas.Body>

            </Offcanvas>
        </>
    );
}
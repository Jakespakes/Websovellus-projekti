import { useState } from 'react'
import Home from './components/home/Home'
import Navbar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'
import Footer from './components/Footer/Footer'
import Login from "./components/login/Login"
import GroupCreation from './group/GroupCreation'
import MobileFooter from './Mobilefooter/MobileFooter'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showGroupCreation, setShowGroupCreation] = useState(false);
  const [groupSuccessMessage, setGroupSuccessMessage] = useState('');
  const [groupsRefreshTrigger, setGroupsRefreshTrigger] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loginMode, setLoginMode] = useState('login');
  const [showProfile, setShowProfile] = useState(false);

  const openLogin = (mode = 'login') => {
    setLoginMode(mode);
    setShowLogin(true);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  }

  // Temporary logout
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Logout failed.');
      }

      setUser(null);

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
  <Container fluid="xl" className="d-flex flex-column min-vh-100">

    <Row>
      <Col>
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLoginClick={() => openLogin('login')}
          user={user}
          onLogout={handleLogout}
          setShowProfile={setShowProfile}
        />
      </Col>
    </Row>

    <Row>

      <Col xs={12} md={3} lg={2}>
        <SideBar
          onLoginClick={() => openLogin('login')}
          onRegisterClick={() => openLogin('register')}
          onCreateGroupClick={() => setShowGroupCreation(true)}
          user={user}
          onLogout={handleLogout}
          refreshTrigger={groupsRefreshTrigger}
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </Col>

      <Col xs={12} md={9} lg={10}>
        <Home
          searchQuery={searchQuery}
          user={user}
          showProfile={showProfile}
        />
      </Col>

    </Row>

    <Row className="mt-auto">
      <Col>
        <Footer/>
      </Col>
    </Row>

    {groupSuccessMessage && (
      <div className="success-notification">
        {groupSuccessMessage}
      </div>
    )}

    {showLogin && (
      <Login
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
        initialMode={loginMode}
      />
    )}

    {showGroupCreation && (
      <GroupCreation
        onClose={() => setShowGroupCreation(false)}
        onSuccess={(groupName) => {
          setShowGroupCreation(false);
          setGroupsRefreshTrigger(prev => prev + 1);
          setGroupSuccessMessage(
            `Ryhmä "${groupName}" luotu onnistuneesti!`
          );

          setTimeout(() => {
            setGroupSuccessMessage('');
          }, 5000);
        }}
      />
    )}

    <MobileFooter
      onMenuClick={() =>
        setMobileSidebarOpen(!mobileSidebarOpen)
      }
    />

  </Container>
  );
}

export default App
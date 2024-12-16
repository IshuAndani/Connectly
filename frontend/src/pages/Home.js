import { useNavigate } from 'react-router-dom';
import {React, useEffect, useState} from 'react';

const Home = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by looking for the token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  const [name, setName] = useState(null); // State to hold the user's name

  // Fetch user details after login
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');

      // Replace the URL with your API endpoint for fetching user data
      fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.name) {
            setName(data.name); // Set the user's name
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [isLoggedIn]);

  // Logout Function
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      localStorage.removeItem('token');
      alert('You have been logged out successfully!');
      navigate('/');
      window.location.reload(); // Reload the page to reset state
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to Connectly{isLoggedIn && name ? `, ${name}` : ''}!</h1>
        <p style={styles.subtitle}>Your one-stop platform for seamless communication and collaboration.</p>
      </header>

      <main>
        <div style={styles.buttonGroup}>
          {!isLoggedIn ? (
            <>
              <button style={styles.button} onClick={() => navigate('/login')}>
                Login
              </button>
              <button style={styles.button} onClick={() => navigate('/register')}>
                Register
              </button>
              <button style={styles.secondaryButton} onClick={() => navigate('/call')}>
                Join as Guest
              </button>
            </>
          ) : (
            <>
              <button style={styles.button} onClick={() => navigate('/call')}>
                Join
              </button>
              <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>

        <div style={styles.featuresSection}>
          <h2 style={styles.featuresTitle}>Features of Connectly</h2>
          <ul style={styles.featuresList}>
            <li style={styles.featureItem}>📹 Video Conferencing</li>
            <li style={styles.featureItem}>✅ Easy Authentication</li>
            <li style={styles.featureItem}>🗂 Team Collaboration Tools</li>
            <li style={styles.featureItem}>🔗 Seamless Integration</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

// Inline styles for better organization
const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: '"Arial", sans-serif',
    backgroundColor: '#f9f9f9',
    color: '#333',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#007BFF',
  },
  subtitle: {
    fontSize: '18px',
    marginTop: '10px',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '18px',
    margin: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '12px 20px',
    fontSize: '18px',
    margin: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '12px 20px',
    fontSize: '18px',
    margin: '10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  featuresSection: {
    marginTop: '50px',
  },
  featuresTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#555',
  },
  featuresList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  featureItem: {
    fontSize: '18px',
    margin: '10px 0',
    color: '#666',
  },
};

export default Home;

// HomePage.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

function HomePage() {
  const location = useLocation();
  const user = location.state?.user; // Get user from location state

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1> {/* Use optional chaining to safely access firstName */}
      <p>This is your user account page.</p>
    </div>
  );
}

export default HomePage;

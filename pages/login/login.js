import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/auth/authContext';
import Layout from '/layouts/layout';



const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);
  
        // Update clearance level in auth context
        dispatch({ type: 'LOGIN', payload: { clearanceLevel: data.clearanceLevel } });
        
        // Redirect the user to the appropriate route based on their clearance level
        
        router.push('/home/home'); // Adjust the path as needed
        
        
        
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Layout>

<style jsx global>{`

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
      

      .input-container {
  display: flex;
  flex-direction: column; /* Change to column layout */
  top: 100%; /* Center vertically */
  margin-left: 85vh; /* Center horizontally */
  transform: translate(-50%, -50%); /* Center vertically and horizontally */
  height: 10vh;
  background-color: #f3f0e9;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.3s;
  margin: 0.5rem 0; /* Add margin for spacing between input fields */
}

/* Add a focus style */
.input-field:focus {
  border-color: #007bff;
}




@media only screen and (max-width: 600px) {

  

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 24.9vh;
  height: 100vh;
}


.input-field {
  width: 90%; /* Set a percentage or fixed value for the width */
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.3s;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column; /* Change to column layout */
  margin-left: 20%; /* Set a percentage or fixed value for margin-left */
  height: 10vh;
  background-color: #f3f0e9;
}

/* Add a focus style */
.input-field:focus {
  border-color: #007bff;
}


  
}


@media only screen and (min-width: 601px) and (max-width: 768px) {
  
}


@media only screen and (min-width: 769px) and (max-width: 1024px) {
  
}

`}</style>
    
    <div className="form-container">
    
    
    <div className="input-container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
    </div>
    <div className="input-container">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
    
      
  </div>
  
  </Layout>
  );
};

export default Login;

import React, { useState } from "react";
import Layout from '/layouts/layout';

import { useRouter } from 'next/router';


function RegisterForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // Add useRouter hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      console.error("Invalid username format");
      return;
    }

    // Validate other fields if needed
    if (name === "" || lastName === "" || email === "" || password === "") {
      console.error("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/register/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastName, email, username, password }),
      });

      if (response.ok) {
        // Registration successful
        console.log("User registered successfully");

        // Redirect the user to the homepage
        router.push('/home/home');
      } else {
        // Registration failed
        console.error("Registration failed");
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

 


.input-container {
  display: flex;
  flex-direction: column; /* Change to column layout */
  top: 100%; /* Center vertically */
  margin-left: 30vh; /* Center horizontally */
  transform: translate(-50%, -50%); /* Center vertically and horizontally */
  height: 10vh;
  background-color: #f3f0e9;
}

/* Define a CSS class for input fields */
.input-field {
  width: 50%;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.3s;
  margin: 0 auto;
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
  <form onSubmit={handleSubmit}>
    <div className="input-container">
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
    </div>
    <div className="input-container">
      <input
        type="text"
        value={lastName}
        placeholder="Last name"
        onChange={(e) => setLastName(e.target.value)}
        className="input-field"
      />
    </div>
    <div className="input-container">
      <input
        type="email"
        value={email}
        placeholder="e-mail"
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
    </div>
    <div className="input-container">
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
    </div>
    <div className="input-container">
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button type="submit">Register</button>
    </div>
    
      
    
  </form>
</div>
     
      </Layout>
  );
}

export default RegisterForm;

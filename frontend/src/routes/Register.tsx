import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userUrl } from "../config";
import useUser from "../context/userStore";

const Register: React.FC = () => {
  const { currentUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerUsername = (
      document.getElementById("register-username") as HTMLInputElement
    ).value;
    const registerPassword = (
      document.getElementById("register-password") as HTMLInputElement
    ).value;
    const confirmPassword = (
      document.getElementById("register-confirm-password") as HTMLInputElement
    ).value;

    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${userUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
        credentials: "include",
      });
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        // Leer JSON del error
        alert(`Error: ${data.message || "Error desconocido"}`); // Mostrar el mensaje real del backend
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <label htmlFor="register-username">Username</label>
        <input type="text" id="register-username" required />

        <label htmlFor="register-password">Password</label>
        <input type="password" id="register-password" required />

        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input type="password" id="register-confirm-password" required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

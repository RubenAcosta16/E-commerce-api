import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userUrl } from "../config";

import useUser from "../context/userStore";

const Login: React.FC = () => {
  const { currentUser, setCurrentUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginUsername = (
      document.getElementById("login-username") as HTMLInputElement
    ).value;
    const loginPassword = (
      document.getElementById("login-password") as HTMLInputElement
    ).value;

    try {
      const response = await fetch(`${userUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
        credentials: "include",
      });

      // Manejo de respuesta
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data.data.user);
        alert(data.message);
        navigate("/");
      } else {
        // Leer JSON del error
        // const errorData = await response.json();
        alert(`Error: ${data.message || "Error desconocido"}`); // Mostrar el mensaje real del backend
      }
    } catch {
      // Solo mostrar un mensaje genérico si hay un error de red
      console.error(
        "Error al intentar iniciar sesión. Por favor, intenta de nuevo."
      );
    }
  };

  // console.log(currentUser);

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label htmlFor="login-username">Username</label>
        <input type="text" id="login-username" required />

        <label htmlFor="login-password">Password</label>
        <input type="password" id="login-password" required />

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;

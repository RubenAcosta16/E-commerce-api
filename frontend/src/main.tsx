// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Login from "./routes/Login.tsx";
import Register from "./routes/Register.tsx";
import ProtectedPage from "./routes/ProtectedPage.tsx";
import Image from "./routes/Image.tsx";
import OneImage from "./routes/OneImage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "protected",
    element: <ProtectedPage></ProtectedPage>,
  },
  {
    path: "image",
    element: <Image></Image>,
  },
  {
    path: "image/:imgId",
    element: <OneImage></OneImage>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

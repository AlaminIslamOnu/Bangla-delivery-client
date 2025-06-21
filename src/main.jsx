import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayOut from "./Layout/RootLayOut";
import Home from "./Pages/Home/Home";
import "aos/dist/aos.css";
import Aos from "aos";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./Pages/Authentication/login/Login";
import Register from "./Pages/Authentication/Register";
import AuthProvider from "./Contexts/AuthProvider";

Aos.init({
  offset: 200,
  duration: 600,
  easing: "ease-in-sine",
  delay: 100,
});

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

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
import Covarage from "./Pages/Covarage/Covarage";
import PrivateRoute from "./Route/PrivateRoute";
import SendParcel from "./Pages/SendParcel/SendParcel";
import DashboardLayout from "./Layout/DashboardLayout";
import MyParcles from "./Pages/Dashboard/MyParcels/MyParcles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Payment from "./Pages/Dashboard/Payment/payment";
import PaymentForm from "./Pages/Dashboard/Payment/PaymentForm";
import PaymentHistory from "./Pages/Dashboard/PaymentHistory/PaymentHistory";
import BeARider from "./Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "./Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRider from "./Pages/Dashboard/ActiveRider/ActiveRider";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "./Pages/Forbidden/Forbidden";
import AdminRoute from "./Route/AdminRoute";
import AssignRider from "./Pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "./Route/RiderRoute";
import PendingDeliveries from "./Pages/Dashboard/PandingDeliveries/PendingDeliveries";

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
      {
        path: "/beARider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
      },
      {
        path: "/covarage",
        Component: Covarage,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: "/sendparcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myparcels",
        Component: MyParcles,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },

      {
        path: "paymenthistory",
        Component: PaymentHistory,
      },
      // Rider route
      {
        path: "pendingdeliveries",
        element: (
          <RiderRoute>
            <PendingDeliveries> </PendingDeliveries>
          </RiderRoute>
        ),
      },

      // admin route
      {
        path: "pendingriders",
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "activeriders",
        element: (
          <AdminRoute>
            <ActiveRider></ActiveRider>
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",

        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "assignRider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>{" "}
          </AdminRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

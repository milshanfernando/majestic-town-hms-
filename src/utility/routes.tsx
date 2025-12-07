// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import RoomsGrid from "../pages/Rooms";
import Reservations from "../pages/Reservations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // shared layout
    children: [
      { index: true, element: <Dashboard /> },
      { path: "rooms", element: <RoomsGrid /> },
      { path: "reserve-room", element: <Reservations /> },
    ],
  },
]);

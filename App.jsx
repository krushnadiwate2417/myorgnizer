import React from "react";
import ReactDOM from "react-dom/client";
import SignUpPage from "./SignUp";
import Verify from "./Verify";
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignUpPage />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

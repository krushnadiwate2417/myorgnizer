import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import SignUpPage from "./SignUp";
import Verify from "./Verify";
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./Context/UserContext";
import Expenses from "./Modules/Expenses";
import WelcomePage from "./Modules/WelcomePage";

const App = () => {
  const [Useremail, setUserEmail] = useState("");

  const data = { email: Useremail };

  return (
    <>
      <UserContext.Provider value={{ data, setUserEmail }}>
        <Header />

        <main>
          <Outlet />
        </main>
      </UserContext.Provider>
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
        children: [
          {
            path: "/home",
            element: <WelcomePage />,
          },
          {
            path: "expenses",
            element: <Expenses />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

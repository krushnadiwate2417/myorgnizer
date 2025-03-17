import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import SignUpPage from "./SignUp";
import Verify from "./Verify";
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import UserContext from "./Context/UserContext";
import Expenses from "./Modules/Expenses";
import WelcomePage from "./Modules/WelcomePage";
import MyChart from "./Modules/Vizualize";

const App = () => {
  const [Useremail, setUserEmail] = useState("");
  const [expenseDataGlobally,setExpenseDataGlobally] = useState();
  const path = useLocation();
  const data = { email: Useremail };

  return (
    <>
      <UserContext.Provider value={{ data, setUserEmail, setExpenseDataGlobally, expenseDataGlobally }}>

          <div>
            <main className="main-outlet">
              <Outlet />
            </main>
          </div>
        
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
      },
      {
        path: "/expenses",
        element: <Expenses />,
      },
      {
        path : "/stats",
        element: <MyChart/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

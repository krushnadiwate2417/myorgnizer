import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import MySidebar from "./Reuseables/MySidebar";
import Expenses from "./Modules/Expenses";

const Home = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("userToken");
    if (!sessionToken) {
      navigate("/login");
    } else {
      setToken(sessionToken);
    }
  }, []);

  return (
    <>
      <div className="home-grid">
        <div className="Home-sidebar">
          <MySidebar>
            <Link to={"/home/expenses"}>My Expenses</Link>
          </MySidebar>
        </div>
        <div className="home-main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;

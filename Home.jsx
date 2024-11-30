import { Link, Outlet, useParams } from "react-router-dom";
import MySidebar from "./Reuseables/MySidebar";
import Expenses from "./Modules/Expenses";

const Home = () => {
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

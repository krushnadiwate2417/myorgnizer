import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header-flex">
        <div>
          <h1>LOGO</h1>
        </div>
        <div className="header-list-flex">
          {/* <li>
            <Link to={"/home"}>Home</Link>
          </li> */}
          <li>
            <Link to={"/"}>
              <button> SignUp </button>
            </Link>
          </li>
          <li>
            <Link to={"/login"}>
              <button>Log In</button>
            </Link>
          </li>
        </div>
      </div>
    </>
  );
};

export default Header;

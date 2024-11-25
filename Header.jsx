import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
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
      </header>
    </>
  );
};

export default Header;

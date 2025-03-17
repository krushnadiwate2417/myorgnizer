import { useContext } from "react";
import {useLocation} from "react-router-dom"
import UserContext from "../Context/UserContext";

const Form = ({ action, handleSubmit, setEmail, email }) => {
  const { setUserEmail } = useContext(UserContext);
  const path = useLocation();
  return (
    <>
      <form onSubmit={handleSubmit} className="form-signup-login">
        <div>
          <label>{path.pathname == '/' ? "Sign Up" : "Log In"}</label>
        </div>
        <div>
          <input
            value={email}
            placeholder="Email"
            type="email"
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setUserEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input placeholder="Password" type="password"/>
        </div>
        <div>
        {path.pathname == "/" ? <input placeholder="Confirm Password" type="password"/> : null}
        </div>
        <div>
          <button type="submit">{action}</button>
        </div>
      </form>
    </>
  );
};

export default Form;

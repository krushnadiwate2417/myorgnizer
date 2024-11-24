import { useContext } from "react";
import UserContext from "../Context/UserContext";

const Form = ({ action, handleSubmit, setEmail, email }) => {
  const { setUserEmail } = useContext(UserContext);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Id</label>
        </div>
        <div>
          <input
            value={email}
            placeholder="Type here..."
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
          <button type="submit">{action}</button>
        </div>
      </form>
    </>
  );
};

export default Form;

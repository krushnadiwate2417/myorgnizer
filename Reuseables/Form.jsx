const Form = ({ action, handleSubmit, setEmail, email }) => {
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

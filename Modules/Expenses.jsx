// import { useState } from "react";

// const [hidingForm, setHidingForm] = useState(true);

// const fileds = ["Date","Method","Amount",]
const options = [
  "Food & Dining",
  "Transportation",
  "Utilities",
  "Rent/Mortgage",
  "Groceries",
  "Entertainment",
  "Health & Fitness",
  "Education",
  "Shopping",
  "Insurance",
  "Savings & Investment",
  "Others",
];

const methods = ["credit card", "debit card", "upi", "cash", "loan"];

const Expenses = () => {
  return (
    <>
      <form className="Main-content">
        <div>
          <label>Date : </label>
          <input type="date" />
        </div>
        <div>
          <label>Used For : </label>
          <input list="Used-For" />
          <datalist id="Used-For">
            {options.map((option) => {
              return <option value={option} />;
            })}
          </datalist>
        </div>
        <div>
          <label>Amount : </label>
          <input type="number" />
        </div>
        <div>
          <label>Payment Method : </label>
          <select id="Payment-Method" name="Payment">
            {methods.map((method) => {
              return <option value={method}>{method}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Description : </label>
          <textarea />
        </div>
        <div>
          <button
          // onClick={() => {
          //   setHidingForm(true);
          // }}
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <button
        // onClick={() => {
        //   setHidingForm(false);
        // }}
        >
          Add Expenses
        </button>
      </div>
    </>
  );
};

export default Expenses;

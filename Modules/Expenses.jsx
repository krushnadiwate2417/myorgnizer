import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import get from "../jsFunctions/get";
import Shimmer from "../Shimmer";
import post from "../jsFunctions/post";
import Table from "../Reuseables/Table";

const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const token = localStorage.getItem("userToken");

const ConfigAPI =
  "https://rgstudentsmanagementbackend.onrender.com/api/v1/expenses/config";

const AddAPI =
  "https://rgstudentsmanagementbackend.onrender.com/api/v1/expenses";

const TableAPI =
  "https://rgstudentsmanagementbackend.onrender.com/api/v1/expenses";

const Expenses = () => {
  const [hidingForm, setHidingForm] = useState("hide");
  const [shimmer, setShimmer] = useState(false);
  const [options, setOptions] = useState();
  const [methods, setMethods] = useState();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [payment, setPayment] = useState("");
  const [description, setDescription] = useState("");
  const [showTable, setShowTable] = useState("hide");
  const [expenseData, setExpenseData] = useState([]);
  const [today, setToday] = useState(getToday());
  const [dynamicAdding, setDynamicAdding] = useState(0);
  console.log(today);

  const path = useLocation();

  const values = {
    category: category,
    description: description,
    amount: Number(amount),
    paymentMethod: payment,
  };

  const handleConfig = async () => {
    setShimmer(true);
    const result = await get(ConfigAPI, token);
    if (result) {
      setShimmer(false);
      setHidingForm("");
      console.log(result, "in result");
      setOptions(result?.categories);
      setMethods(result?.paymentMethods);
    }
  };

  const handleAddExpense = async (e) => {
    setShimmer(true);
    e.preventDefault();
    const result = await post(AddAPI, values, path.pathname, token);
    if (result) {
      setHidingForm("hide");
      setShimmer(false);
      console.log(result);
      setDynamicAdding((curr) => curr + 1);
    }
  };

  useEffect(() => {
    handleShowExpenses();
  }, [dynamicAdding]);

  const handleShowExpenses = async () => {
    const result = await get(TableAPI, token);
    if (result) {
      console.log(result);
      setShimmer(false);
      setExpenseData(result);
      // setShowTable("");
    }
  };

  return (
    <>
      {shimmer ? (
        <Shimmer />
      ) : (
        <div className={hidingForm}>
          <form className="Main-content" onSubmit={handleAddExpense}>
            <div>
              <label>Date : </label>
              <input
                type="date"
                value={today}
                onChange={(e) => {
                  setToday(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Category : </label>
              <input
                list="Used-For"
                required
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
              <datalist id="Used-For">
                {hidingForm == "hide"
                  ? null
                  : options.map((option, index) => {
                      return <option key={index} value={option} />;
                    })}
              </datalist>
            </div>
            <div>
              <label>Amount : </label>
              <input
                type="number"
                required
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Payment Method : </label>
              <select
                defaultValue=""
                id="Payment-Method"
                required
                onChange={(e) => {
                  setPayment(e.target.value);
                }}
              >
                <option value="" disabled hidden>
                  Select an Option
                </option>
                {hidingForm == "hide"
                  ? null
                  : methods.map((method, index) => {
                      return (
                        <option key={index} value={method}>
                          {method}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div>
              <label>Description : </label>
              <textarea
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div>
              <button>ADD</button>
            </div>
          </form>
        </div>
      )}

      <div>
        <button
          onClick={() => {
            handleConfig();
          }}
        >
          Add Expenses
        </button>
        <button
          onClick={() => {
            setDynamicAdding((curr) => curr + 1);
            setShimmer(true);
            handleShowExpenses();
            setShowTable("");
          }}
        >
          Show Expenses
        </button>
      </div>
      <div className={showTable}>
        <Table expenseData={expenseData} />
      </div>
    </>
  );
};

export default Expenses;

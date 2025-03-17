import { useEffect, useState,useContext } from "react";
import { useLocation } from "react-router-dom";
import get from "../jsFunctions/get";
import Shimmer from "../Shimmer";
import post from "../jsFunctions/post";
import Table from "../Reuseables/Table";
import UserContext from "../Context/UserContext";
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

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
  const [hidingAddExpenses,setHidingAddExpenses] = useState("")
  const [expenseData, setExpenseData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [today, setToday] = useState(getToday());
  const [dynamicAdding, setDynamicAdding] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const {setExpenseDataGlobally} = useContext(UserContext); 
  const path = useLocation();

  const values = {
    date : today,
    category: category,
    description: description,
    amount: Number(amount),
    paymentMethod: payment,
  };

  const handleConfig = async () => {
    setShimmer(true);
    setHidingAddExpenses("hide");
    setHidingForm("form-div");
    setShowTable("hide")
    const result = await get(ConfigAPI, token);
    if (result) {
      setShimmer(false);

      setOptions(result?.categories);
      setMethods(result?.paymentMethods);
    }
  };

  const handleAddExpense = async (e) => {

    setShimmer(true);
    setHidingAddExpenses("")
    setHidingForm("hide")
    e.preventDefault();
    const result = await post(AddAPI, values, path.pathname, token);
    if (result) {
      setShimmer(false);
      toast.success("Expense Added Successfully",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // setDynamicAdding((curr) => curr + 1);
    }
  };

  // useEffect(() => {
  //   handleShowExpenses();
  // }, [dynamicAdding]);

  const handleShowExpenses = async () => {
    setHidingForm('hide')
    setHidingAddExpenses("")
    const result = await get(TableAPI, token);
    if (result) {

      setShimmer(false);
      setTotalRecords(result?.data.totalRecords);
      setExpenseData(result?.data?.expenses);
      setExpenseDataGlobally(result?.data?.expenses)
      setFilterData(result?.data?.expenses);
      setPageData(result?.data?.expenses);
      // setShowTable("");
    }
  };

  return (
    <>
    <ToastContainer/>
      {shimmer ? (
        <Shimmer />
      ) : (
        <div className="expense-grid-c ">
          <div className={hidingForm}>
          <form className="form-content" onSubmit={handleAddExpense}>
            <div className="fields">
              <label>Date</label>
              <input
                type="date"
                value={today}
                onChange={(e) => {
                  setToday(e.target.value);
                }}
              />
            </div>
            <div className="fields">
              <label>Category</label>
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
            <div className="fields">
              <label>Amount</label>
              <input
                type="number"
                required
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div className="fields">
              <label>Payment Method</label>
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
            <div className="fields">
              <label>Description</label>
              <textarea
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="add-btn-form">
              <button>ADD</button>
            </div>
          </form>
        </div>

      <div className="home-btns">
        <button className={` ${hidingAddExpenses} btns add-btn`}
          onClick={() => {
            handleConfig();
          }}
        >
          Add Expenses
        </button>
        <button className="btns show-btn"
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
        <Table
          expenseData={expenseData}
          setExpenseData={setExpenseData}
          filterData={filterData}
          setFilterData={setFilterData}
          totalRecords={totalRecords}
          setPageData={setPageData}
          pageData={pageData}
        />
      </div>
        </div>

        )}
    </>
  );
};

export default Expenses;

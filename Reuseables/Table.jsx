import { useState,useContext } from "react";
import {useNavigate} from 'react-router-dom'
import Select from "./Select";
import TableData from "./TableData";
import UserContext from "../Context/UserContext";


const Table = ({
  expenseData,
  setExpenseData,
  filterData,
  setFilterData,
  totalRecords,
  pageData,
  setPageData,
}) => {
  if (expenseData.length == 0) return;

  const [amountSort, setAmountSort] = useState("Sort by Min Amount");
  const [dateSort, setDateSort] = useState("Sort by Recent Date");
  const [filteringVal, setFilteringVal] = useState(false);
  const [pagingVal, setPagingVal] = useState(false);
  const navigate = useNavigate()
  const cateogry = [];
  const payment = [];
  const records = [];

  for (let i = 1; i <= Math.round(totalRecords / 5); i++) {
    records.push(i);
  }

  expenseData.map((val) => {
    cateogry.push(val.category);
    payment.push(val?.paymentMethod);
  });

  const catSet = [...new Set(cateogry)];
  const paySet = [...new Set(payment)];

  return (
    <>
      <div className="table-grid">
      <div>
      <div className="sort-btns-div">
      <button
        className="sortBtn"
        onClick={() => {
          setAmountSort(
            amountSort == "Sort by Min Amount"
              ? "Sort by Max Amount"
              : "Sort by Min Amount"
          );
          pagingVal
            ? setPageData(
                amountSort == "Sort by Min Amount"
                  ? pageData.sort((a, b) => a.amount - b.amount) // ascending order min -> max
                  : pageData.sort((a, b) => b.amount - a.amount) // decending order max -> min
              )
            : filteringVal
            ? setFilterData(
                amountSort == "Sort by Min Amount"
                  ? filterData.sort((a, b) => a.amount - b.amount) // ascending order min -> max
                  : filterData.sort((a, b) => b.amount - a.amount) // decending order max -> min
              )
            : setExpenseData(
                amountSort == "Sort by Min Amount"
                  ? expenseData.sort((a, b) => a.amount - b.amount) // ascending order min -> max
                  : expenseData.sort((a, b) => b.amount - a.amount) // decending order max -> min
              );
        }}
      >
        {amountSort}
      </button>
      <button
        className="sortBtn"
        onClick={() => {
          setDateSort(
            dateSort === "Sort by Recent Date"
              ? "Sort by Old Date"
              : "Sort by Recent Date"
          );
          pagingVal
            ? setPageData(
                dateSort == "Sort by Recent Date"
                  ? pageData.sort(
                      (a, b) => new Date(b.date) - new Date(a.date) // recent -> oldest
                    )
                  : pageData.sort(
                      (a, b) => new Date(a.date) - new Date(b.date) // oldest -> recent
                    )
              )
            : filteringVal
            ? setFilterData(
                dateSort == "Sort by Recent Date"
                  ? filterData.sort(
                      (a, b) => new Date(b.date) - new Date(a.date) // recent -> oldest
                    )
                  : filterData.sort(
                      (a, b) => new Date(a.date) - new Date(b.date) // oldest -> recent
                    )
              )
            : setExpenseData(
                dateSort == "Sort by Recent Date"
                  ? expenseData.sort(
                      (a, b) => new Date(b.date) - new Date(a.date) // recent -> oldest
                    )
                  : expenseData.sort(
                      (a, b) => new Date(a.date) - new Date(b.date) // oldest -> recent
                    )
              );
        }}
      >
        {dateSort}
      </button>
      </div>
      <div className="filter-div">
        <div>
        <label>Filter By </label>
        <Select
          label={"Category"}
          setFilteringVal={setFilteringVal}
          mappingArr={catSet}
          expenseData={expenseData}
          setFilterData={setFilterData}
        />
        </div>
        <div>
        <Select
          label={"Payment Method"}
          setFilteringVal={setFilteringVal}
          mappingArr={paySet}
          expenseData={expenseData}
          setFilterData={setFilterData}
        />
        </div>
      </div>
      </div>
      <div>
      <table border="1">
        <thead className="headings">
          <tr>
            <th>Sr No</th>
            <th>Date</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <TableData
          data={pagingVal ? pageData : filteringVal ? filterData : expenseData}
        />
      </table>
      </div>
      <div className="pagination-btns">
      {records.map((val) => {
        return (
          <button
            onClick={() => {
              console.log(val);
              setPageData(
                val == 1
                  ? expenseData.slice(val - 1, val + 4)
                  : expenseData.slice(Number(val) * 5 - 5, Number(val) * 5)
              );
              setPagingVal(true);
            }}
          >
            {val}
          </button>
        );
      })}
      <button
        onClick={() => {
          setPagingVal(false);
        }}
      >
        Show Complete Table
      </button>
      </div>
      <div className="stats-btn-div">
        <button className="stats-btn" onClick={()=>{
          navigate("/stats")
        }}>Show Stats</button>
      </div>
      </div>
    </>
  );
};

export default Table;

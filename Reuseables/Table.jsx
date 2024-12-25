import { useState } from "react";
import Select from "./Select";
import TableData from "./TableData";
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
  const cateogry = [];
  const payment = [];
  const records = [];

  for (let i = 1; i <= Math.round(totalRecords / 2); i++) {
    records.push(i);
  }

  expenseData.map((val) => {
    cateogry.push(val.category);
    payment.push(val?.paymentMethod);
  });

  const catSet = [...new Set(cateogry)];
  const paySet = [...new Set(payment)];

  console.log("PAGE", pageData);

  return (
    <>
      <button
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
      <div>
        <label>Filter By </label>
        <Select
          label={"Category"}
          setFilteringVal={setFilteringVal}
          mappingArr={catSet}
          expenseData={expenseData}
          setFilterData={setFilterData}
        />
        <Select
          label={"Payment Method"}
          setFilteringVal={setFilteringVal}
          mappingArr={paySet}
          expenseData={expenseData}
          setFilterData={setFilterData}
        />
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Date</th>
            <th>Time</th>
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
      {records.map((val) => {
        return (
          <button
            onClick={() => {
              console.log(val);
              setPageData(
                val == 1
                  ? expenseData.slice(val - 1, val + 1)
                  : expenseData.slice(Number(val) * 2 - 2, Number(val) * 2)
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
    </>
  );
};

export default Table;

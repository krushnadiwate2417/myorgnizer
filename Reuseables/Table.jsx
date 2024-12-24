import { useState } from "react";
import Select from "./Select";
const Table = ({ expenseData, setExpenseData, filterData, setFilterData }) => {
  if (expenseData.length == 0) return;

  const [amountSort, setAmountSort] = useState("Sort by Min Amount");
  const [dateSort, setDateSort] = useState("Sort by Recent Date");
  const [filteringVal, setFilteringVal] = useState(false);
  const cateogry = [];
  const payment = [];

  expenseData.map((val) => {
    cateogry.push(val.category);
    payment.push(val?.paymentMethod);
  });

  const catSet = [...new Set(cateogry)];
  const paySet = [...new Set(payment)];

  const handleDate = (date) => {
    const d = new Date(date);
    const dd = d.getDate();
    const mm = d.getMonth();
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const handleTime = (date) => {
    const t = new Date(date);
    const hr = t.getHours();
    const mt = t.getMinutes();
    const stat = hr / 12 <= 1 ? "am" : "pm";

    return `${new String(hr % 12).padStart(2, 0)} : ${new String(mt).padStart(
      2,
      0
    )} ${stat}`;
  };

  console.log("filter", filterData);

  return (
    <>
      <button
        onClick={() => {
          setAmountSort(
            amountSort == "Sort by Min Amount"
              ? "Sort by Max Amount"
              : "Sort by Min Amount"
          );
          setExpenseData(
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
          setExpenseData(
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
        {filteringVal
          ? filterData.map((val, index) => {
              return (
                <tbody key={val._id}>
                  <tr className="dataInTable">
                    <td>{index + 1}</td>
                    <td>{handleDate(val?.date)}</td>
                    <td>{handleTime(val?.date)}</td>
                    <td>{val?.category}</td>
                    <td>{val?.paymentMethod}</td>
                    <td>{val?.description}</td>
                    <td>{val?.amount}/-</td>
                  </tr>
                </tbody>
              );
            })
          : expenseData.map((val, index) => {
              return (
                <tbody key={val._id}>
                  <tr className="dataInTable">
                    <td>{index + 1}</td>
                    <td>{handleDate(val?.date)}</td>
                    <td>{handleTime(val?.date)}</td>
                    <td>{val?.category}</td>
                    <td>{val?.paymentMethod}</td>
                    <td>{val?.description}</td>
                    <td>{val?.amount}/-</td>
                  </tr>
                </tbody>
              );
            })}
        <tfoot>
          <td colSpan={7}>
            Total :{" "}
            {filteringVal
              ? filterData
                  .map((val) => {
                    return Number(val?.amount);
                  })
                  .reduce((acc, curr) => acc + curr, 0)
              : expenseData
                  .map((val) => {
                    return Number(val?.amount);
                  })
                  .reduce((acc, curr) => acc + curr, 0)}
          </td>
        </tfoot>
      </table>
    </>
  );
};

export default Table;

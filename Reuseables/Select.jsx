const Select = ({
  label,
  setFilteringVal,
  mappingArr,
  expenseData,
  setFilterData,
}) => {
  return (
    <>
      <label>{label}</label>
      <select
        defaultValue=""
        onChange={(e) => {
          if (e.target.value === "all") {
            setFilteringVal(false);
          } else {
            setFilteringVal(true);
            setFilterData(
              label == "Category"
                ? expenseData.filter((cat) => cat.category == e.target.value)
                : expenseData.filter(
                    (cat) => cat.paymentMethod == e.target.value
                  )
            );
          }
        }}
      >
        {" "}
        <option hidden>Select </option>
        {mappingArr.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
        <option value={"all"}>All</option>
      </select>
    </>
  );
};

export default Select;
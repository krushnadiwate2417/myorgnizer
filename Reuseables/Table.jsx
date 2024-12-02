const Table = ({ expenseData }) => {
  if (expenseData.length == 0) return;

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

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        {expenseData.map((val, index) => {
          return (
            <tbody key={val._id}>
              <tr className="dataInTable">
                <td>{index + 1}</td>
                <td>{val?.amount}/-</td>
                <td>{val?.category}</td>
                <td>{val?.paymentMethod}</td>
                <td>{val?.description}</td>
                <td>{handleDate(val?.date)}</td>
                <td>{handleTime(val?.date)}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
};

export default Table;

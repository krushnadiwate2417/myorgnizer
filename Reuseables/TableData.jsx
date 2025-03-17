const handleDate = (date) => {
  const d = new Date(date);
  const dd = d.getDate();
  const mm = d.getMonth() + 1;
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

// const handleTime = (date) => {
//   const t = new Date(date);
//   const hr = t.getHours();
//   const mt = t.getMinutes();
//   const stat = hr / 12 <= 1 ? "am" : "pm";

//   return `${new String(hr % 12).padStart(2, 0)} : ${new String(mt).padStart(
//     2,
//     0
//   )} ${stat}`;
// };

const TableData = ({ data }) => {
  return (
    <>
      {data.map((val, index) => {
        return (
          <tbody key={val._id}>
            <tr className="dataInTable">
              <td><b>{index + 1}</b></td>
              <td>{handleDate(val?.date)}</td>
              {/* <td>{handleTime(val?.date)}</td> */}
              <td>{val?.category}</td>
              <td>{val?.paymentMethod}</td>
              <td>{val?.description}</td>
              <td>{val?.amount}/-</td>
            </tr>
          </tbody>
        );
      })}
      <tfoot>
        <tr >
          <td colSpan={7} className="tfoot">
          Total :{" "}
          {data
            .map((val,index) => {
              return Number(val?.amount);
            })
            .reduce((acc, curr) => acc + curr, 0)} /-
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default TableData;
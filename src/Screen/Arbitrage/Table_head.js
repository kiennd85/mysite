import './form.css';
const Table_head = () => {
  return (
    <>
      <div
        className="add_row"
        style={{ marginTop: '10px' }}
      >
        <table>
          <tbody>
            <tr>
              <td className="js_time">Time</td>
              <td className="js_token">Token</td>
              <td className="js_source">Source</td>
              <td className="js_chain">Chain</td>
              <td className="js_base">Base</td>
              <td className="js_usd1">USD</td>
              <td className="js_price">Buy</td>
              <td className="js_qty">Qty B</td>
              <td className="js_dest">Dest</td>
              <td className="js_chain">Chain</td>
              <td className="js_base">Base</td>
              {/* <td className="js_qty">Qty S</td> */}
              <td className="js_price">Sell</td>
              {/* <td className="js_usd2">USD</td> */}
              <td className="js_gain">Gain</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table_head;

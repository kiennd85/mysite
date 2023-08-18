import './form.css';
const Table_obj = (table_obj) => {
  const obj = table_obj.table_obj;

  return (
    <>
      {obj != '' && (
        <div style={{ margin: '10px' }}>
          <table className="table table-bordered table-sm">
            <tbody>
              {obj.list_sell.map((item, index) => (
                <tr
                  key={index}
                  className={item.gain > 2 ? 'table-warning' : item.gain > 0 ? 'table-primary' : ''}
                >
                  <td className="js_time">{obj.time_now}</td>
                  <td
                    className="js_token"
                    style={{ color: 'red' }}
                  >
                    {obj.token_name}
                  </td>
                  <td
                    className="js_source"
                    style={{ color: obj.source == 'Bybit' ? 'blue' : {} }}
                  >
                    {obj.source}
                  </td>
                  <td className="js_chain">{obj.chain}</td>
                  <td className="js_token">{obj.token_base}</td>
                  <td className="js_usd">{item.amountA1}u</td>
                  <td className="js_price">{item.price_buy.toFixed(6)}</td>
                  <td className="js_qty">{item.amountB1.toFixed(2)}</td>
                  <td
                    className="js_dest"
                    style={{ color: item.dest == 'Bybit' ? 'blue' : {} }}
                  >
                    {item.dest}
                  </td>
                  <td className="js_chain">{item.chain}</td>
                  <td className="js_token">{item.token_base}</td>
                  <td className="js_qty">{item.amountA2.toFixed(2)}</td>
                  <td className="js_price">{item.price_sell.toFixed(6)}</td>
                  <td className="js_qty">{item.amountB2.toFixed(2)}u</td>
                  <td
                    className="js_gain"
                    style={{ color: 'red' }}
                  >
                    {item.gain.toFixed(2)}u
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table_obj;

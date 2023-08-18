import './form.css';
const Table_addrow = ({ table_obj }) => {
  const obj = table_obj;

  const gain_warning = 2;
  const gain_primary = 0;

  let r_ui = '';

  if (obj != '') {
    if (obj?.result_ui == undefined) {
      r_ui = 'OK';
    } else if (obj.result_ui.rs == 'OK') {
      r_ui = 'OK';
    } else {
      r_ui = 'ERR';
    }
  }

  const style_red_color = { color: 'red' };
  return (
    <>
      <div className="add_row">
        <table>
          <tbody>
            {r_ui == 'OK'
              ? obj.list_sell.map((item, index) => (
                  <tr
                    key={index}
                    className={item.gain > gain_warning ? 'row_warning' : item.gain > gain_primary ? 'row_primary' : ''}
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
                      style={{ fontWeight: 'bold', color: ['Bybit', 'Gateio', 'Bidget', 'Houbi'].includes(obj.source) ? 'blue' : {} }}
                    >
                      {obj.source}
                    </td>
                    <td className="js_chain">{obj.chain}</td>
                    <td className="js_base">{obj.token_base}</td>
                    <td className="js_usd1">{item.amountA1}u</td>
                    {/* <td className="js_price">{item?.price_buy.toFixed(6)}</td> */}

                    <td className="js_price">{item?.price_buy != undefined ? item.price_buy.toFixed(6) : 'nan'}</td>
                    <td className="js_qty">{item?.amountB1 != undefined ? item.amountB1.toFixed(0) : 'nan'}</td>
                    {/* <td className="js_qty">{item?.amountB1.toFixed(0)}</td> */}
                    <td
                      className="js_dest"
                      style={{ fontWeight: 'bold', color: ['Bybit', 'Gateio', 'Bidget', 'Houbi'].includes(item.dest) ? 'blue' : {} }}
                    >
                      {item.dest}
                    </td>
                    <td className="js_chain">{item.chain}</td>
                    <td className="js_base">{item.token_base}</td>
                    {/* <td className="js_qty">{item.amountA2.toFixed(0)}</td> */}

                    <td className="js_price">{item?.price_sell != undefined ? item.price_sell.toFixed(6) : 'nan'}</td>
                    {/* {obj.type === 'SWAP' ? <td className="js_usd2">{item?.amountB3 != undefined ? `${item.amountB2.toFixed(2)}u` : 'nan'}</td> : <td className="js_usd2">{item?.amountB2 != undefined ? `${item.amountB2.toFixed(2)}u` : 'nan'}</td>} */}
                    {/* <td className="js_usd2">{item?.amountB2 != undefined ? `${item.amountB2.toFixed(1)}` : 'nan'}</td> */}
                    <td
                      className="js_gain"
                      style={{ color: 'red', fontWeight: item.gain > gain_primary ? 'bold' : 'normal' }}
                    >
                      {item?.gain != undefined ? `${item.gain.toFixed(2)}u` : 0}
                    </td>
                  </tr>
                ))
              : r_ui == 'ERR' && (
                  <tr>
                    <td>{obj.result_ui.detail}</td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table_addrow;

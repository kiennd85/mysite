import './form.css';
const Table_addrow = ({ table_obj }) => {
  const obj = table_obj;
  const gain_warning = -1;
  const gain_primary = -2;

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

  //Style cho token
  const style_token = (gain) => {
    let style = { color: 'red' };
    if (gain != undefined) {
      if (gain >= gain_primary && gain < gain_warning) {
        style = { color: 'yellow' };
      }
    }
    return style;
  };

  //Style cho gain
  const style_gain = (gain) => {
    let style = { color: 'red' };
    if (gain != undefined) {
      if (gain >= gain_primary && gain < gain_warning) {
        style = { color: '#FFCCCB' };
      }
    }
    return style;
  };

  //Styling cho source
  const style_source = (gain, item) => {
    const style = { fontWeight: 'bold' };
    if (gain === undefined) {
      return style;
    } else {
      if (gain >= gain_primary && gain < gain_warning) {
        if (['Bybit', 'Gateio'].includes(item)) {
          return { ...style, color: 'yellow' };
        } else {
          return style;
        }
      } else {
        if (['Bybit', 'Gateio'].includes(item)) {
          return { ...style, color: 'blue' };
        } else {
          return style;
        }
      }
    }
  };

  //Styling cho row khi gain đạt kỳ vọng
  const style_row = (gain) => {
    let style = {};
    if (gain != undefined) {
      if (gain >= gain_warning) {
        style = { backgroundColor: 'yellow' };
      } else if (gain >= gain_primary) {
        style = { color: 'white', backgroundColor: 'blue' };
      }
    }
    return style;
  };

  return (
    <>
      <div className="add_row">
        <table>
          <tbody>
            {r_ui == 'OK'
              ? obj.list_sell.map((item, index) => (
                  <tr
                    key={index}
                    style={style_row(item?.gain)}
                  >
                    <td className="js_time">{obj.time_now}</td>
                    <td
                      className="js_token"
                      style={style_token(item?.gain)}
                    >
                      {obj.token_name}
                    </td>
                    <td
                      className="js_source"
                      style={style_source(item?.gain, obj.source)}
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
                      style={{ fontWeight: 'bold', color: ['Bybit', 'Gateio'].includes(item.dest) ? 'blue' : {} }}
                    >
                      {item.dest}
                    </td>
                    <td className="js_chain">{item.chain}</td>
                    <td className="js_base">{item.token_base}</td>
                    {/* <td className="js_qty">{item.amountA2.toFixed(0)}</td> */}

                    <td className="js_price">{item?.price_sell != undefined ? item.price_sell.toFixed(6) : 'nan'}</td>
                    <td className="js_usd2">{item?.amountB2 != undefined ? `${item.amountB2.toFixed(2)}u` : 'nan'}</td>
                    <td
                      className="js_gain"
                      style={style_gain(item?.gain)}
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

import { query_getAmountsOut, query_getAmountOut, find_token_Step, step_dex, find_token_BNB, thena_bnb, pancake_bnb } from './blockchain';

import sound from './soundalert.mp3';
const mp3 = new Audio(sound);

const bigInt = require('big-integer');

//Lấy time hiện tại
export function get_time_now() {
  const today = new Date();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  return time;
}
//Lấy 2 chữ số sau dấu phẩy
export function round_down_num(amount_raw, decimal) {
  const amount_raw_str = amount_raw.toString();
  const index_decimal = amount_raw_str.indexOf('.');

  if (index_decimal) {
    const amount = amount_raw_str.slice(0, index_decimal + 1 + decimal);
    return amount;
  } else {
    return amount_raw;
  }
}

//Clone dữ liệu object hoặc mảng
export function clone_obj_json(obj) {
  const objClone = JSON.parse(JSON.stringify(obj));
  return objClone;
}

export function query_CEX_buyside(props) {
  const { amountA, order_book_ask, cex_trade_fee, cex_withdraw_fee } = props;

  let amountX = 0;
  let amountY = 0;

  let orderbook_by_amountA = [];

  for (let r of order_book_ask) {
    if (amountX + Number(r[0]) * Number(r[1]) <= amountA) {
      amountX += Number(r[0]) * Number(r[1]);
      amountY += Number(r[1]);
      orderbook_by_amountA.push([Number(r[0]), Number(r[1])]);
    } else {
      let amountX_remain = amountA - amountX;
      amountX += amountX_remain;
      amountY += amountX_remain / Number(r[0]);
      const amount_temp = amountX_remain / Number(r[0]);
      orderbook_by_amountA.push([Number(r[0]), amount_temp]);
      break;
    }
  }

  const average_ask = amountX / amountY;
  //amountY = amountX / average_ask;
  amountY = amountY * (1 - cex_trade_fee);
  amountY = amountY - cex_withdraw_fee;

  const obj = { average_ask: average_ask, amountA: amountX, amountB: amountY, orderbook_by_amountA: orderbook_by_amountA };

  return obj;
}
export function query_CEX_sellside(props) {
  const { amountA, order_book_bid, cex_trade_fee } = props;

  let amountX = 0; //Token
  let amountY = 0; //USD

  for (let r of order_book_bid) {
    if (amountX + Number(r[1]) <= amountA) {
      amountX += Number(r[1]);
      amountY += Number(r[0]) * Number(r[1]);
    } else {
      let amountX_remain = amountA - amountX;
      amountX += amountX_remain;
      amountY += amountX_remain * Number(r[0]);
      break;
    }
  }

  const average_bid = amountY / amountX;
  amountY = amountY * (1 - cex_trade_fee);

  const obj = { average_bid: average_bid, amountA: amountX, amountB: amountY };

  return obj;
}
export async function query_DEX_sellside(dic_info, amount, dex_name) {
  let amountX = amount;
  let amountIn = amountX * 10 ** dic_info['tokenA'][2];

  if (isNaN(amountIn)) {
    console.log(amountIn);
  }

  let result;
  if (!isNaN(amountIn)) {
    if (!Number.isInteger(amountIn)) {
      amountIn = parseInt(amountIn);
    }
    amountIn = bigInt(amountIn).value;

    const router_contract = dic_info['router_contract'];
    const path = dic_info['path'];

    const props = { router_contract, amountIn, path };

    result = await query_getAmountsOut(props);
  } else {
    result = 'error';
  }

  let obj;
  if (result != 'error') {
    let amountY = result.slice(-1)[0];
    amountY = Number(amountY) / 10 ** dic_info['tokenB'][2];
    const price_sell_1 = amountY / amountX;
    const price_sell_2 = amountX / amountY;

    obj = { amountA: amountX, amountB: amountY, price_sell_1: price_sell_1, price_sell_2: price_sell_2, price_sell: price_sell_1 };
  } else {
    obj = result;
  }

  return obj;
}
export async function query_Thena_sellside(dic_info, amount) {
  //let amountX = Math.floor(amountNextStep);
  let amountX = amount;

  let amountIn = amountX * 10 ** dic_info['tokenA'][2];
  amountIn = bigInt(amountIn).value;

  const router_contract = dic_info['router_contract'];
  const tokenA_address = dic_info['tokenA'][1];
  const tokenB_address = dic_info['tokenB'][1];

  const props = { router_contract, amountIn, tokenA_address, tokenB_address };

  const result = await query_getAmountOut(props);
  let obj;
  if (result != 'error') {
    let amountY = Number(result.amount) / 10 ** dic_info['tokenB'][2];
    const price_sell_1 = amountY / amountX;
    const price_sell_2 = amountX / amountY;

    obj = { amountA: amountX, amountB: amountY, price_sell_1: price_sell_1, price_sell_2: price_sell_2, price_sell: price_sell_1 };
  } else {
    obj = result;
  }

  return obj;
}
export async function query_DEX_buyside(dic_info, amount, dex_name) {
  let amountX = amount;

  let amountIn = amountX * 10 ** dic_info['tokenA'][2];

  if (dex_name == 'Pancake') {
    amountIn = bigInt(amountIn).value;
  }

  const router_contract = dic_info['router_contract'];
  const path = dic_info['path'];

  const props = { router_contract, amountIn, path };

  const result = await query_getAmountsOut(props);

  let obj;
  if (result != 'error') {
    let amountY = result.slice(-1)[0];
    amountY = Number(amountY) / 10 ** dic_info['tokenB'][2];
    const price_buy_1 = amountY / amountX;
    const price_buy_2 = amountX / amountY;

    obj = { amountA: amountX, amountB: amountY, price_buy_1: price_buy_1, price_buy_2: price_buy_2, price_buy: price_buy_2 };
  } else {
    obj = result;
  }
  return obj;
}
export async function query_Thena_buyside(dic_info, amount) {
  //let amountX = Math.floor(amountNextStep);
  let amountX = amount;

  let amountIn = amountX * 10 ** dic_info['tokenA'][2];
  amountIn = bigInt(amountIn).value;

  const router_contract = dic_info['router_contract'];
  const tokenA_address = dic_info['tokenA'][1];
  const tokenB_address = dic_info['tokenB'][1];

  const props = { router_contract, amountIn, tokenA_address, tokenB_address };

  const result = await query_getAmountOut(props);

  let obj;
  if (result != 'error') {
    let amountY = Number(result.amount) / 10 ** dic_info['tokenB'][2];
    const price_buy_1 = amountY / amountX;
    const price_buy_2 = amountX / amountY;

    obj = { amountA: amountX, amountB: amountY, price_buy_1: price_buy_1, price_buy_2: price_buy_2, price_buy: price_buy_2 };
  } else {
    obj = result;
  }
  return obj;
}
export async function asyncProcessing_sell(element, current_order_book, item) {
  if (element.type == 'CEX') {
    element.dest = element.name_cex;
    element.amountA2 = 0;
    element.amountB2 = 0;
    element.price_sell = 0;
    element.gain = 0;

    //Lấy dữ liệu order book
    const order_book_item = current_order_book.find((ele) => {
      return ele.token == item.token_name && ele.cex == element.name_cex;
    });

    let order_book_bid;
    if (order_book_item === undefined) {
      console.log(`${item.token_name}: not found the order book`);
    } else if (order_book_item.orderbook === 'error') {
      console.log(`${item.token_name}: error api cex`);
    } else {
      if (element.name_cex == 'Bybit') {
        order_book_bid = order_book_item.orderbook.data.result.b;
      } else if (element.name_cex == 'Gateio') {
        order_book_bid = order_book_item.orderbook.data.bids;
      } else if (element.name_cex == 'Houbi') {
        order_book_bid = order_book_item.orderbook.data.tick.bids;
      } else if (element.name_cex == 'Bitget') {
        order_book_bid = order_book_item.orderbook.data.data.bids;
      }
      const cex_trade_fee = element.cex_trade_fee;

      const amountA = element.amountB1 - element.crosschain_fee;
      const props = { amountA, order_book_bid, cex_trade_fee };
      const obj_temp = query_CEX_sellside(props);

      element.amountA2 = obj_temp.amountA;
      element.amountB2 = obj_temp.amountB;
      element.price_sell = obj_temp.average_bid;
      element.gain = element.amountB2 - element.amountA1;
      //console.log(element);
      // if (element?.gain_lv1 != undefined) {
      //   if (element.gain >= element.gain_lv1) {
      //     mp3.play();
      //   }
      // }

      if (element.alert_gain === 'yes') {
        if (element.gain >= element.gain_lv1) {
          mp3.play();
        }
      }
    }
  } else if (element.type == 'DEX') {
    const amountA2 = element.amountB1 - element.crosschain_fee;

    const dest = element.name_dex;
    const path = element.path1;
    const { tokenA, tokenB, router_contract, web3 } = element;

    const dic_info = { tokenA: tokenA, tokenB: tokenB, path: path, router_contract: router_contract, web3: web3 };

    let obj_temp;
    if (dest == 'Thena') {
      obj_temp = await query_Thena_sellside(dic_info, amountA2);
    } else {
      obj_temp = await query_DEX_sellside(dic_info, amountA2, dest);
    }

    if (typeof obj_temp === 'object') {
      element.price_sell = obj_temp.price_sell;
      element.amountA2 = obj_temp.amountA;
      element.amountB2 = obj_temp.amountB;
      element.gain = element.amountB2 - element.amountA1;
      // if (element?.gain_lv1 != undefined) {
      //   if (element.gain >= element.gain_lv1) {
      //     mp3.play();
      //   }
      // }
      if (element.alert_gain === 'yes') {
        if (element.gain >= element.gain_lv1) {
          mp3.play();
        }
      }
    }
    element.dest = dest;
  }
}
export async function asyncProcessing_buy(props) {
  const { element, item } = props;
  const amountA = element.amountA1;
  if (item.type == 'DEX') {
    let dest;
    if (element.type == 'DEX') {
      dest = element.name_dex;
    } else if (element.type == 'CEX') {
      dest = element.name_cex;
    }

    const { dic_info } = props;
    let obj_temp;
    if (item.source == 'Thena') {
      obj_temp = await query_Thena_buyside(dic_info, amountA);
    } else {
      obj_temp = await query_DEX_buyside(dic_info, amountA, item.source);
    }

    if (typeof obj_temp === 'object') {
      element.dest = dest;
      element.price_buy = obj_temp.price_buy;
      element.amountB1 = obj_temp.amountB;
    }
  }
  if (item.type == 'CEX') {
    const { element, item, order_book_ask } = props;
    const cex_trade_fee = item.cex_trade_fee;
    const cex_withdraw_fee = item.cex_withdraw_fee;

    const props_cex = { amountA, order_book_ask, cex_trade_fee, cex_withdraw_fee };
    const obj_temp = query_CEX_buyside(props_cex);
    element.price_buy = obj_temp.average_ask;
    element.amountB1 = obj_temp.amountB;
  }
}
export function get_token_address_decimal_path(item_list) {
  const item_list_new = JSON.parse(JSON.stringify(item_list));

  item_list_new.map((it) => {
    const item_o = it.data;
    //Lấy thông tin token
    if (item_o.type == 'DEX') {
      if (item_o.chain == 'Step') {
        const ele = {};
        const [tokenA_adress, tokenA_decimal] = find_token_Step(item_o.token_name);
        const [tokenB_adress, tokenB_decimal] = find_token_Step(item_o.token_base);
        ele.tokenA = [item_o.token_name, tokenA_adress, tokenA_decimal];
        ele.tokenB = [item_o.token_base, tokenB_adress, tokenB_decimal];
        ele.path1 = [tokenA_adress, tokenB_adress];
        ele.path2 = [tokenB_adress, tokenA_adress];
        if (item_o.name_dex == 'Step') {
          const { router_contract, web3 } = step_dex();
          ele.router_contract = router_contract;
          ele.web3 = web3;
        }
        item_o.information = ele;
      } else if (item_o.chain == 'BNB') {
        const ele = {};
        const [tokenA_adress, tokenA_decimal] = find_token_BNB(item_o.token_name);
        const [tokenB_adress, tokenB_decimal] = find_token_BNB(item_o.token_base);
        ele.tokenA = [item_o.token_name, tokenA_adress, tokenA_decimal];
        ele.tokenB = [item_o.token_base, tokenB_adress, tokenB_decimal];
        ele.path1 = [tokenA_adress, tokenB_adress];
        ele.path2 = [tokenB_adress, tokenA_adress];

        if (item_o.token_r && item_o.token_r != '') {
          const [tokenR_adress, tokenR_decimal] = find_token_BNB(item_o.token_r);
          ele.tokenR = [item_o.token_r, tokenR_adress, tokenR_decimal];
          ele.path1 = [tokenA_adress, tokenR_adress, tokenB_adress];
          ele.path2 = [tokenB_adress, tokenR_adress, tokenA_adress];
        }

        if (item_o.name_dex == 'Thena') {
          const { router_contract, web3 } = thena_bnb();
          ele.router_contract = router_contract;
          ele.web3 = web3;
        } else if (item_o.name_dex == 'Pancake') {
          const { router_contract, web3 } = pancake_bnb();
          ele.router_contract = router_contract;
          ele.web3 = web3;
        }
        item_o.information = ele;
      }
    }

    item_o.list_sell.forEach((element) => {
      if ((element.type == 'DEX' || element.type == 'SWAP') && element.chain == 'Step') {
        const [tokenA_adress, tokenA_decimal] = find_token_Step(item_o.token_name);
        const [tokenB_adress, tokenB_decimal] = find_token_Step(element.token_base);
        element.tokenA = [item_o.token_name, tokenA_adress, tokenA_decimal];
        element.tokenB = [element.token_base, tokenB_adress, tokenB_decimal];

        element.path1 = [tokenA_adress, tokenB_adress];
        element.path2 = [tokenB_adress, tokenA_adress];

        if (element.token_r && element.token_r != '') {
          const [tokenR_adress, tokenR_decimal] = find_token_Step(element.token_r);
          element.tokenR = [element.token_r, tokenR_adress, tokenR_decimal];
          element.path1 = [tokenA_adress, tokenR_adress, tokenB_adress];
          element.path2 = [tokenB_adress, tokenR_adress, tokenA_adress];
        }

        if (element.name_dex == 'Step') {
          const { router_contract, web3 } = step_dex();
          element.router_contract = router_contract;
          element.web3 = web3;
        }
      } else if (element.type == 'DEX' && element.chain == 'BNB') {
        const [tokenA_adress, tokenA_decimal] = find_token_BNB(item_o.token_name);
        const [tokenB_adress, tokenB_decimal] = find_token_BNB(element.token_base);
        element.tokenA = [item_o.token_name, tokenA_adress, tokenA_decimal];
        element.tokenB = [element.token_base, tokenB_adress, tokenB_decimal];
        element.path1 = [tokenA_adress, tokenB_adress];
        element.path2 = [tokenB_adress, tokenA_adress];

        if (element.token_r && element.token_r != '') {
          const [tokenR_adress, tokenR_decimal] = find_token_BNB(element.token_r);
          element.tokenR = [element.token_r, tokenR_adress, tokenR_decimal];
          element.path1 = [tokenA_adress, tokenR_adress, tokenB_adress];
          element.path2 = [tokenB_adress, tokenR_adress, tokenA_adress];
        }

        if (element.name_dex == 'Thena') {
          const { router_contract, web3 } = thena_bnb();
          element.router_contract = router_contract;
          element.web3 = web3;
        } else if (element.name_dex == 'Pancake') {
          const { router_contract, web3 } = pancake_bnb();
          element.router_contract = router_contract;
          element.web3 = web3;
        }
      }
    });
  });

  return item_list_new;
}

export function get_token_list_on_CEX(item_list) {
  let token_list = [];

  item_list.forEach((x) => {
    const item = x.data;
    if (item.type == 'CEX') {
      const new_item = { cex: item.name_cex, name: item.token_name };
      if (!token_list.includes(new_item)) {
        token_list.push(new_item);
      }
    }
    item.list_sell.forEach((ele) => {
      if (ele.type == 'CEX') {
        const check = token_list.find((y) => {
          return y.cex == ele.name_cex && y.name == item.token_name;
        });
        console.log(check);
        if (!check) {
          const new_ele = { cex: ele.name_cex, name: item.token_name };
          token_list.push(new_ele);
        }
      }
    });
  });
  return token_list;
}

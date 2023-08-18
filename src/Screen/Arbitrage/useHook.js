import { useEffect, useState } from 'react';
import { get_orderbook_bidget, get_orderbook_bybit, get_orderbook_gateio, get_orderbook_houbi } from '../../Common/cex_api';
import { get_time_now, asyncProcessing_sell, asyncProcessing_buy, get_token_address_decimal_path, get_token_list_on_CEX, query_CEX_buyside, query_DEX_sellside, query_CEX_sellside } from '../../Common/function';
import { item_list_1 } from './data';
import { item_list_2 } from './data';
import { item_list_3 } from './data';
//import sound from './soundalert.mp3';
import sound from '../../Common/soundalert.mp3';
//import { Telegram_send_msg } from '../../Common/telegram';
const mp3 = new Audio(sound);

//Lấy chi tiết address, decimal, path trên blockchain
const item_list_new_1 = get_token_address_decimal_path(item_list_1);
const item_list_new_2 = get_token_address_decimal_path(item_list_2);
const item_list_new_3 = get_token_address_decimal_path(item_list_3);

//Lấy danh sach token cần get order book trên CEX
const token_list_1 = get_token_list_on_CEX(item_list_new_1);
const token_list_2 = get_token_list_on_CEX(item_list_new_2);
//const token_list_3 = get_token_list_on_CEX(item_list_new_3);
const token_list_3 = [
  { cex: 'Bybit', name: 'FITFI' },
  { cex: 'Bybit', name: 'KCAL' },
  { cex: 'Bybit', name: 'PRIMAL' },
  { cex: 'Houbi', name: 'KCAL' },
  { cex: 'Gateio', name: 'SPEX' },
  { cex: 'Gateio', name: 'FITFI' },
  { cex: 'Gateio', name: 'KCAL' },
];
// // console.log(token_list_1);
// // console.log(token_list_2);

//Lấy dữ liệu order book ask
function cex_get_orderbook_ask(current_order_book, token_name, name_cex) {
  const order_book_item = current_order_book.find((ele) => {
    return ele.token == token_name && ele.cex == name_cex;
  });

  let order_book_ask;
  if (order_book_item !== undefined) {
    if (order_book_item?.orderbook !== 'error') {
      if (name_cex == 'Bybit') {
        order_book_ask = order_book_item.orderbook.data.result.a;
      } else if (name_cex == 'Houbi') {
        order_book_ask = order_book_item.orderbook.data.tick.asks;
      } else if (name_cex == 'Gateio') {
        order_book_ask = order_book_item.orderbook.data.asks;
      }
    }
  }
  return order_book_ask;
}

//Lấy dữ liệu order book bid
function cex_get_orderbook_bid(current_order_book, token_dest, cex_dest) {
  const order_book_item = current_order_book.find((ele) => {
    return ele.token == token_dest && ele.cex == cex_dest;
  });

  let order_book_bid;
  if (order_book_item !== undefined) {
    if (order_book_item?.orderbook !== 'error') {
      if (cex_dest == 'Bybit') {
        order_book_bid = order_book_item.orderbook.data.result.b;
      } else if (cex_dest == 'Gateio') {
        order_book_bid = order_book_item.orderbook.data.bids;
      }
    }
  }
  return order_book_bid;
}

//sell trên cex
function cex_sell_token(order_book_bid, element) {
  if (order_book_bid !== undefined) {
    const cex_trade_fee = element.cex_trade_fee;

    const amountA = element.amountB2;
    const props = { amountA, order_book_bid, cex_trade_fee };
    const obj_temp = query_CEX_sellside(props);

    element.amountA3 = obj_temp.amountA;
    element.amountB3 = obj_temp.amountB;
    element.price_sell = obj_temp.average_bid;
  } else {
    element.amountA3 = 0;
    element.amountB3 = 0;
    element.price_sell = 0;
  }
}

//buy trên cex
function cex_buy_token(order_book_ask, element, cex_trade_fee, cex_withdraw_fee) {
  const amountA = element.amountA1;
  const props = { amountA, order_book_ask, cex_trade_fee, cex_withdraw_fee };
  const obj_temp = query_CEX_buyside(props);
  element.price_buy = obj_temp.average_ask;
  element.amountB1 = obj_temp.amountB;
}

//hàm xử lý swap trên dex
async function process_swap_element(item, element, order_book_ask, current_order_book) {
  const cex_trade_fee = item.cex_trade_fee;
  const cex_withdraw_fee = item.cex_withdraw_fee;

  cex_buy_token(order_book_ask, element, cex_trade_fee, cex_withdraw_fee);

  //Bước 3: Swap trên DEX
  const amountA2 = element.amountB1;

  const path = element.path1;
  const { tokenA, tokenB, router_contract, web3 } = element;
  const dic_info = { tokenA: tokenA, tokenB: tokenB, path: path, router_contract: router_contract, web3: web3 };
  const obj_temp = await query_DEX_sellside(dic_info, amountA2);

  element.price_sell = obj_temp.price_sell;
  element.amountA2 = obj_temp.amountA;
  element.amountB2 = obj_temp.amountB;

  //Bước 4: Sell trên CEX
  const token_dest = element.token_base;
  const cex_dest = element.name_cex;
  element.dest = element.name_cex;

  //Lấy dữ liệu order_bid
  const order_book_bid = cex_get_orderbook_bid(current_order_book, token_dest, cex_dest);

  cex_sell_token(order_book_bid, element);

  //Bước 5: Lấy gain
  element.gain = element.amountB3 - element.amountA1;

  //Phát âm thanh cảnh báo
  if (element.alert_gain === 'yes') {
    if (element.gain >= element.gain_lv1) {
      mp3.play();
    }
  }

  //Gửi telegram cảnh báo
  // if (element?.alert_tele === 'yes') {
  //   if (element.gain >= element.gain_tele && element.count === 0) {
  //     let msg = '[React] ';
  //     msg += `Lệch giá ${item.token_name} (${item.name_cex}) > ${element.token_base}: ${element.gain.toFixed(2)}u\n`;
  //     msg += `| ${element.amountA1}u| ${element.price_buy.toFixed(6)}| ${element.amountB1.toFixed(2)}| ${element.price_sell.toFixed(6)}| ${element.amountA3.toFixed(2)}`;
  //     Telegram_send_msg(msg);
  //     element.count = element.count_interval;
  //   }
  // }
}

const useHook = () => {
  const [o1_fitfi, set_o1_fitfi] = useState('');
  const [o2_fitfi, set_o2_fitfi] = useState('');
  const [o3_fitfi, set_o3_fitfi] = useState('');
  const [o4_fitfi, set_o4_fitfi] = useState('');

  const [o1_kcal, set_o1_kcal] = useState('');
  const [o2_kcal, set_o2_kcal] = useState('');
  const [o3_kcal, set_o3_kcal] = useState('');
  const [o4_kcal, set_o4_kcal] = useState('');

  const [o1_primal, set_o1_primal] = useState('');
  const [o2_primal, set_o2_primal] = useState('');
  const [o3_primal, set_o3_primal] = useState('');
  const [o4_primal, set_o4_primal] = useState('');

  const [o1_rjv, set_o1_rjv] = useState('');
  const [o2_rjv, set_o2_rjv] = useState('');
  const [o3_rjv, set_o3_rjv] = useState('');

  const [o1_dao, set_o1_dao] = useState('');
  const [o2_dao, set_o2_dao] = useState('');
  const [o3_dao, set_o3_dao] = useState('');

  const [o1_xeta, set_o1_xeta] = useState('');
  const [o2_xeta, set_o2_xeta] = useState('');
  const [o3_xeta, set_o3_xeta] = useState('');
  const [o4_xeta, set_o4_xeta] = useState('');
  const [o5_xeta, set_o5_xeta] = useState('');

  const [o1_newtoken, set_o1_newtoken] = useState('');
  const [o2_newtoken, set_o2_newtoken] = useState('');
  const [o3_newtoken, set_o3_newtoken] = useState('');

  const [t1_fitfi, set_t1_fitfi] = useState('');
  const [t2_fitfi, set_t2_fitfi] = useState('');
  const [t1_kcal, set_t1_kcal] = useState('');
  const [t2_kcal, set_t2_kcal] = useState('');
  const [t1_primal, set_t1_primal] = useState('');
  const [t1_spex, set_t1_spex] = useState('');
  const [t3_kcal, set_t3_kcal] = useState('');

  //Token lấy trên CEX
  //const token_list = ['FITFI', 'KCAL', 'PRIMAL'];
  // const token_list = [
  //   { cex: 'Bybit', name: 'FITFI' },
  //   { cex: 'Bybit', name: 'KCAL' },
  //   { cex: 'Houbi', name: 'KCAL' },
  //   { cex: 'Bybit', name: 'PRIMAL' },
  //   { cex: 'Gateio', name: 'PRIMAL' },
  //   { cex: 'Gateio', name: 'RJV' },
  //   { cex: 'Gateio', name: 'DAO' },
  //   { cex: 'Bybit', name: 'XETA' },
  // ];

  const Arbitrage_function = async (item_list, token_list) => {
    //===================================================
    //Get order book trên CEX
    let current_order_book = [];
    async function asyncProcessing_orderbook(tokenobj, current_order_book) {
      let result = '';
      let template = '';
      if (tokenobj.cex == 'Bybit') {
        result = await get_orderbook_bybit(tokenobj.name);
        template = { cex: tokenobj.cex, token: tokenobj.name, orderbook: result };
      } else if (tokenobj.cex == 'Gateio') {
        result = await get_orderbook_gateio(tokenobj.name);
        template = { cex: tokenobj.cex, token: tokenobj.name, orderbook: result };
      } else if (tokenobj.cex == 'Houbi') {
        result = await get_orderbook_houbi(tokenobj.name);
        template = { cex: tokenobj.cex, token: tokenobj.name, orderbook: result };
      } else if (tokenobj.cex == 'Bitget') {
        result = await get_orderbook_bidget(tokenobj.name);
        template = { cex: tokenobj.cex, token: tokenobj.name, orderbook: result };
      }
      current_order_book.push(template);
    }
    const promises_cex = token_list.map(async (tokenobj) => await asyncProcessing_orderbook(tokenobj, current_order_book));
    await Promise.all(promises_cex);
    //===================================================
    //Bắt đầu chạy dữ liệu
    async function asyncProcessing_item(it) {
      const item_o = it.data;

      //Copy dữ liệu gốc, giữ nguyên dữ liệu item_o
      const item = { ...item_o };
      item.list_sell = [];

      item_o.list_sell.forEach((element) => {
        const ele = { ...element };
        item.list_sell.push(ele);
      });

      //Thòi gian thực hiện
      item.time_now = get_time_now();

      //Định nghĩa biến hiện UI, xử lý catch trường hợp lỗi
      let result_ui = { rs: '', detail: '' };

      //Nhánh 1=========================================
      if (item.type == 'CEX') {
        //console.log('Vào nhánh CEX');
        //Bước 1: Mua trên CEX nếu item.type là CEX
        item.source = item.name_cex;
        item.chain = '';
        item.base = '';

        //Lấy dữ liệu order book
        const order_book_item = current_order_book.find((ele) => {
          return ele.token == item.token_name && ele.cex == item.name_cex;
        });

        let order_book_ask;

        if (order_book_item === undefined) {
          result_ui = { rs: 'NOK', detail: `${item.token_name}: not found the order book` };
        } else if (order_book_item.orderbook === 'error') {
          result_ui = { rs: 'NOK', detail: `${item.token_name}: error api cex` };
        } else {
          result_ui = { rs: 'OK', detail: '' };
          if (item.name_cex == 'Bybit') {
            if (order_book_item.orderbook.data.result?.a) {
              order_book_ask = order_book_item.orderbook.data.result.a;
            } else {
              result_ui = { rs: 'NOK', detail: `${item.token_name}: error ask order book in api` };
            }
          } else if (item.name_cex == 'Gateio') {
            order_book_ask = order_book_item.orderbook.data.asks;
          } else if (item.name_cex == 'Houbi') {
            order_book_ask = order_book_item.orderbook.data.tick.asks;
          } else if (item.name_cex == 'Bitget') {
            order_book_ask = order_book_item.orderbook.data.data.asks;
          }
        }

        if (result_ui.rs === 'OK') {
          //Lấy khối lượng buy trên cex và update vào item
          const promises = item.list_sell.map(async (element) => await asyncProcessing_buy({ element, item, order_book_ask }));
          await Promise.all(promises);

          //Bước 2: Bán trên DEX
          const promises_sell = item.list_sell.map(async (element) => await asyncProcessing_sell(element, current_order_book, item));
          await Promise.all(promises_sell);
        }

        item.result_ui = result_ui;
      }

      //Nhánh 2=========================================
      if (item.type == 'DEX') {
        //Bước 1: Mua trên DEX nếu item.type là DEX
        //console.log('Vào nhánh DEX');

        item.source = item.name_dex;
        const tokenA = item.information.tokenA;
        const tokenB = item.information.tokenB;
        const path = item.information.path2;
        const router_contract = item.information.router_contract;
        const web3 = item.information.web3;

        const dic_info = { tokenA: tokenB, tokenB: tokenA, path: path, router_contract: router_contract, web3: web3 };

        //const props = {}
        const promises = item.list_sell.map(async (element) => await asyncProcessing_buy({ element, item, dic_info }));
        await Promise.all(promises);

        //===Bước 2: bán trên CEX/DEX====
        const promises_sell = item.list_sell.map(async (element) => await asyncProcessing_sell(element, current_order_book, item));
        await Promise.all(promises_sell);
      }

      //Nhánh 2=========================================
      if (item.type == 'SWAP') {
        //Bước 1: Lấy order book ask trên CEX
        const token_name = item.token_name;
        const name_cex = item.name_cex;

        //Lấy dữ liệu order book
        const order_book_ask = cex_get_orderbook_ask(current_order_book, token_name, name_cex);

        //Bước 2: Lấy số USD cần mua trên CEX > số lượng amount B
        if (order_book_ask !== undefined) {
          const promises = item.list_sell.map(async (element) => {
            await process_swap_element(item, element, order_book_ask, current_order_book);
          });
          await Promise.all(promises);

          item.source = item.name_cex;

          //Update biến count (dùng để gửi telegram theo khoảng time)
          item.list_sell.forEach((ele) => {
            if (ele?.count > 0) {
              ele.count -= 1;
              //console.log(ele?.count);
              const y = it.data.list_sell.find((x) => x.amountA1 === ele.amountA1 && x.name_dex === ele.name_dex && x.token_base === ele.token_base);
              y.count = ele.count;
            }
          });
        } else {
          result_ui = { rs: 'NOK', detail: `${item.token_name}: error` };
        }
      }

      //=========================================
      //Set useState
      if (it.key == 1) {
        set_o1_fitfi(item);
      } else if (it.key == 2) {
        set_o2_fitfi(item);
      } else if (it.key == 3) {
        set_o3_fitfi(item);
      } else if (it.key == 4) {
        set_o4_fitfi(item);
      } else if (it.key == 5) {
        set_o1_kcal(item);
      } else if (it.key == 14) {
        set_o2_kcal(item);
      } else if (it.key == 15) {
        set_o3_kcal(item);
      } else if (it.key == 6) {
        set_o1_primal(item);
      } else if (it.key == 8) {
        set_o2_primal(item);
      } else if (it.key == 9) {
        set_o3_primal(item);
      } else if (it.key == 10) {
        set_o4_primal(item);
      } else if (it.key == 11) {
        set_o1_rjv(item);
      } else if (it.key == 12) {
        set_o2_rjv(item);
      } else if (it.key == 13) {
        set_o3_rjv(item);
      } else if (it.key == 16) {
        set_o1_dao(item);
      } else if (it.key == 17) {
        set_o2_dao(item);
      } else if (it.key == 18) {
        set_o3_dao(item);
      } else if (it.key == 19) {
        set_o1_xeta(item);
      } else if (it.key == 20) {
        set_o2_xeta(item);
      } else if (it.key == 21) {
        set_o3_xeta(item);
      } else if (it.key == 22) {
        set_o4_xeta(item);
      } else if (it.key == 23) {
        set_o4_kcal(item);
      } else if (it.key == 24) {
        set_o5_xeta(item);
      } else if (it.key == 25) {
        set_o1_newtoken(item);
      } else if (it.key == 26) {
        set_o2_newtoken(item);
      } else if (it.key == 27) {
        set_o3_newtoken(item);
      } else if (it.key == 't1') {
        set_t1_fitfi(item);
      } else if (it.key == 't2') {
        set_t1_kcal(item);
      } else if (it.key == 't3') {
        set_t2_kcal(item);
      } else if (it.key == 't4') {
        set_t1_primal(item);
      } else if (it.key == 't5') {
        set_t1_spex(item);
      } else if (it.key == 't6') {
        set_t2_fitfi(item);
      } else if (it.key == 't7') {
        set_t3_kcal(item);
      }
    }

    const promises = item_list.map(async (it) => await asyncProcessing_item(it));
    await Promise.all(promises);

    // let j = 1;
    // for (let it of item_list) {
    //   setTimeout(async () => {
    //     console.log('Check biến j: ', j);
    //     await asyncProcessing_item(it);
    //   }, j * 100);
    //   j += 1;
    // }
  };

  const [nIntervId, setnIntervId] = useState(null);

  const btnStart = (e) => {
    //Arbitrage_function(item_list_new_1, token_list_1);
    //Arbitrage_function(item_list_new_2, token_list_2);
    //Arbitrage_function(item_list_new_3, token_list_3);
    console.log(String(get_time_now()), 'Start');
    const newid = setInterval(() => {
      setnIntervId(newid);
      console.log(String(get_time_now()), 'List3');
      Arbitrage_function(item_list_new_3, token_list_3);
      setTimeout(() => {
        console.log(String(get_time_now()), 'List1');
        Arbitrage_function(item_list_new_1, token_list_1);
      }, 400);
      setTimeout(() => {
        console.log(String(get_time_now()), 'List2');
        Arbitrage_function(item_list_new_2, token_list_2);
      }, 800);
    }, 1200);
  };
  const btnStop = (e) => {
    clearInterval(nIntervId);
    setnIntervId(null);
  };

  const btnTest = (e) => {
    console.log('btnTest');
    //get_orderbook_gateio('RJV');
    //Test_Telegram();
  };

  return { btnStart, btnStop, btnTest, o1_fitfi, o2_fitfi, o3_fitfi, o4_fitfi, o1_kcal, o2_kcal, o3_kcal, o1_primal, o2_primal, o3_primal, o4_primal, o1_rjv, o2_rjv, o3_rjv, o1_dao, o2_dao, o3_dao, o1_xeta, o2_xeta, o3_xeta, o4_xeta, o4_kcal, o5_xeta, o1_newtoken, o2_newtoken, o3_newtoken, t1_fitfi, t2_fitfi, t1_kcal, t2_kcal, t3_kcal, t1_primal, t1_spex };
};

export default useHook;

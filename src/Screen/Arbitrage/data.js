let item_o1_fitfi = {
  token_name: 'FITFI',
  type: 'CEX',
  name_cex: 'Bybit',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 1,
  list_sell: [
    { amountA1: 50, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDT', alert_gain: 'no', gain_lv1: 1 },
    { amountA1: 50, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no', gain_lv1: 20 },
    { amountA1: 250, crosschain_fee: 200, type: 'DEX', chain: 'BNB', name_dex: 'Thena', token_base: 'USDT', alert_gain: 'no', gain_lv1: 20 },
    //{ amountA1: 300, crosschain_fee: 200, type: 'DEX', chain: 'BNB', name_dex: 'Thena', token_base: 'USDT', alert_gain: 'no', gain_lv1: 20 },
  ],
};

let item_o2_fitfi = {
  token_name: 'FITFI',
  type: 'DEX',
  chain: 'Step',
  name_dex: 'Step',
  token_base: 'USDC',
  information: '',
  list_sell: [{ amountA1: 100, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'no', gain_lv1: 0.9 }],
};

let item_o3_fitfi = {
  token_name: 'FITFI',
  type: 'DEX',
  chain: 'Step',
  name_dex: 'Step',
  token_base: 'USDT',
  information: '',
  list_sell: [{ amountA1: 100, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'no', gain_lv1: 0.9 }],
};

let item_o4_fitfi = {
  token_name: 'FITFI',
  type: 'DEX',
  chain: 'BNB',
  name_dex: 'Thena',
  token_base: 'USDT',
  information: '',
  list_sell: [{ amountA1: 200, crosschain_fee: 5, type: 'CEX', chain: 'Step', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'no', gain_lv1: 1.3 }],
};

let item_o5_fitfi = {
  token_name: 'FITFI',
  type: 'CEX',
  name_cex: 'Gateio',
  cex_trade_fee: 0.003,
  cex_withdraw_fee: 10,
  list_sell: [
    { amountA1: 50, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDT', alert_gain: 'no', gain_lv1: 0.2 },
    { amountA1: 50, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no', gain_lv1: 0.2 },
    { amountA1: 250, crosschain_fee: 200, type: 'DEX', chain: 'BNB', name_dex: 'Thena', token_base: 'USDT', alert_gain: 'no', gain_lv1: 0.9 },
  ],
};

let item_o1_kcal = {
  token_name: 'KCAL',
  type: 'CEX',
  name_cex: 'Bybit',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 1,

  list_sell: [{ amountA1: 100, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no', gain_lv1: 20 }],
};

let item_o2_kcal = {
  token_name: 'KCAL',
  type: 'DEX',
  chain: 'Step',
  name_dex: 'Step',
  token_base: 'USDC',
  information: '',
  list_sell: [
    //{ amountA1: 50, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'no', gain_lv1: 0.4 },
    { amountA1: 100, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'no', gain_lv1: 0.8 },
    //{ amountA1: 100, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Houbi', cex_trade_fee: 0.001, alert_gain: 'no' },
    //{ amountA1: 100, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'no' },
  ],
};

let item_o3_kcal = {
  token_name: 'KCAL',
  type: 'CEX',
  name_cex: 'Houbi',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 1,

  list_sell: [{ amountA1: 100, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no' }],
};

let item_o4_kcal = {
  token_name: 'KCAL',
  type: 'CEX',
  name_cex: 'Gateio',
  cex_trade_fee: 0.003,
  cex_withdraw_fee: 10,

  list_sell: [{ amountA1: 100, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no' }],
};

let item_o1_primal = {
  token_name: 'PRIMAL',
  type: 'CEX',
  name_cex: 'Bybit',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 10,

  list_sell: [
    { amountA1: 100, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no', gain_lv1: 30 },
    { amountA1: 50, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no', gain_lv1: 30 },
    { amountA1: 100, crosschain_fee: 0, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'BUSD', alert_gain: 'no', gain_lv1: 30 },
    //{ amountA1: 50, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Gateio', cex_trade_fee: 0.003 },
  ],
};
let item_o2_primal = {
  token_name: 'PRIMAL',
  type: 'CEX',
  name_cex: 'Gateio',
  cex_trade_fee: 0.003,
  cex_withdraw_fee: 1000,

  list_sell: [
    //{ amountA1: 200, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC' },
    //{ amountA1: 100, crosschain_fee: 0, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC' },
    //{ amountA1: 200, crosschain_fee: 0, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'BUSD' },
    { amountA1: 200, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 3 },
  ],
};

let item_o3_primal = {
  token_name: 'PRIMAL',
  type: 'DEX',
  chain: 'Step',
  name_dex: 'Step',
  token_base: 'USDC',
  information: '',
  list_sell: [
    { amountA1: 50, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'no' },
    { amountA1: 50, crosschain_fee: 0, type: 'CEX', chain: 'Step', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'no', gain_lv1: 0.8 },
    { amountA1: 100, crosschain_fee: 10, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'BUSD', alert_gain: 'no', gain_lv1: 0.8 },
  ],
};

let item_o4_primal = {
  token_name: 'PRIMAL',
  type: 'DEX',
  chain: 'BNB',
  name_dex: 'Pancake',
  token_base: 'BUSD',
  information: '',
  list_sell: [
    { amountA1: 100, crosschain_fee: 0, type: 'CEX', chain: 'BSC', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'yes', gain_lv1: 2 },
    { amountA1: 300, crosschain_fee: 1000, type: 'CEX', chain: 'Step', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'no', gain_lv1: 50 },
    { amountA1: 210, crosschain_fee: 1000, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no', gain_lv1: 50 },
  ],
};

let item_o1_rjv = {
  token_name: 'RJV',
  type: 'CEX',
  name_cex: 'Gateio',
  cex_trade_fee: 0.003,
  cex_withdraw_fee: 50,
  list_sell: [
    { amountA1: 250, crosschain_fee: 44, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDT', alert_gain: 'no' },
    { amountA1: 210, crosschain_fee: 0, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'USDT', token_r: 'WBNB', alert_gain: 'no' },
    //{ amountA1: 300, crosschain_fee: 1000, type: 'CEX', chain: 'Step', name_cex: 'Bybit', cex_trade_fee: 0.001 },
  ],
};

let item_o2_rjv = {
  token_name: 'RJV',
  type: 'DEX',
  chain: 'Step',
  name_dex: 'Step',
  token_base: 'USDT',
  information: '',
  list_sell: [
    { amountA1: 210, crosschain_fee: 44, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'USDT', token_r: 'WBNB', alert_gain: 'no', gain_lv1: 50 },
    { amountA1: 300, crosschain_fee: 44, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'USDT', token_r: 'WBNB', alert_gain: 'no', gain_lv1: 50 },
    { amountA1: 210, crosschain_fee: 44, type: 'CEX', chain: 'Step', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'no', gain_lv1: 3 },
  ],
};

let item_o3_rjv = {
  token_name: 'RJV',
  type: 'DEX',
  chain: 'BNB',
  name_dex: 'Pancake',
  token_base: 'USDT',
  token_r: 'WBNB',
  information: '',
  list_sell: [
    { amountA1: 250, crosschain_fee: 44, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDT', alert_gain: 'no', gain_lv1: 3 },
    { amountA1: 210, crosschain_fee: 44, type: 'CEX', chain: 'BNB', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'no' },
  ],
};

let item_o1_dao = {
  token_name: 'DAO',
  type: 'CEX',
  name_cex: 'Gateio',
  cex_trade_fee: 0.003,
  cex_withdraw_fee: 1.1,
  list_sell: [
    { amountA1: 400, crosschain_fee: 10, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no' },
    { amountA1: 400, crosschain_fee: 0, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'BUSD', alert_gain: 'no' },
    { amountA1: 400, crosschain_fee: 0, type: 'DEX', chain: 'BNB', name_dex: 'Thena', token_base: 'BUSD', alert_gain: 'no' },
  ],
};

let item_o2_dao = {
  token_name: 'DAO',
  type: 'DEX',
  chain: 'BNB',
  name_dex: 'Pancake',
  token_base: 'BUSD',
  information: '',
  list_sell: [{ amountA1: 400, crosschain_fee: 0, type: 'CEX', chain: 'BSC', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'no' }],
};

let item_o3_dao = {
  token_name: 'DAO',
  type: 'DEX',
  chain: 'BNB',
  name_dex: 'Thena',
  token_base: 'BUSD',
  information: '',
  list_sell: [{ amountA1: 400, crosschain_fee: 0, type: 'CEX', chain: 'BSC', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'no' }],
};

let item_o1_xeta = {
  token_name: 'XETA',
  type: 'CEX',
  name_cex: 'Bybit',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 20,
  list_sell: [
    { amountA1: 350, crosschain_fee: 105, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no', gain_lv1: 10 },
    { amountA1: 300, crosschain_fee: 64, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'BUSD', alert_gain: 'no', gain_lv1: 10 },
  ],
};

let item_o2_xeta = {
  token_name: 'XETA',
  type: 'DEX',
  chain: 'BNB',
  name_dex: 'Pancake',
  token_base: 'BUSD',
  information: '',
  list_sell: [
    { amountA1: 300, crosschain_fee: 64, type: 'CEX', chain: 'Avax', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'no' },
    { amountA1: 300, crosschain_fee: 105, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no' },
  ],
};

let item_o3_xeta = {
  token_name: 'XETA',
  type: 'DEX',
  chain: 'Step',
  name_dex: 'Step',
  token_base: 'USDC',
  information: '',
  list_sell: [
    { amountA1: 300, crosschain_fee: 64, type: 'CEX', chain: 'Avax', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'no' },
    { amountA1: 300, crosschain_fee: 105, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'BUSD', alert_gain: 'no' },
  ],
};

let item_o4_xeta = {
  token_name: 'XETA',
  type: 'CEX',
  name_cex: 'Bidget',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 1,
  list_sell: [
    { amountA1: 350, crosschain_fee: 105, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no', gain_lv1: 10 },
    { amountA1: 300, crosschain_fee: 64, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'BUSD', alert_gain: 'no', gain_lv1: 10 },
  ],
};

let item_o5_xeta = {
  token_name: 'XETA',
  type: 'CEX',
  name_cex: 'Gateio',
  cex_trade_fee: 0.003,
  cex_withdraw_fee: 10,
  list_sell: [
    { amountA1: 300, crosschain_fee: 105, type: 'DEX', chain: 'Step', name_dex: 'Step', token_base: 'USDC', alert_gain: 'no', gain_lv1: 10 },
    //{ amountA1: 300, crosschain_fee: 64, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'BUSD', gain_lv1: 3 },
  ],
};

let item_o1_newtoken = {
  token_name: 'SEILOR',
  type: 'DEX',
  chain: 'BNB',
  name_dex: 'Pancake',
  token_base: 'BUSD',
  //token_r: '',
  information: '',
  list_sell: [
    { amountA1: 100, crosschain_fee: 0, type: 'CEX', chain: 'BNB', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'yes', gain_lv1: 3 },
    { amountA1: 100, crosschain_fee: 0, type: 'CEX', chain: 'BNB', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 3 },
  ],
};

let item_o2_newtoken = {
  token_name: 'SEILOR',
  type: 'CEX',
  name_cex: 'Bybit',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 8,
  list_sell: [{ amountA1: 100, crosschain_fee: 0, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'USDT', token_r: 'WBNB', alert_gain: 'yes', gain_lv1: 3 }],
};

let item_o3_newtoken = {
  token_name: 'SEILOR',
  type: 'CEX',
  name_cex: 'Gateio',
  cex_trade_fee: 0.003,
  cex_withdraw_fee: 10,
  list_sell: [{ amountA1: 100, crosschain_fee: 0, type: 'DEX', chain: 'BNB', name_dex: 'Pancake', token_base: 'USDT', token_r: 'WBNB', alert_gain: 'yes', gain_lv1: 3 }],
};

let item_t1_fitfi = {
  token_name: 'FITFI',
  chain: 'Step',
  type: 'SWAP',
  name_cex: 'Bybit',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 10,
  list_sell: [
    { amountA1: 300, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'KCAL', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 1 },
    { amountA1: 200, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'KCAL', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 1 },
    { amountA1: 100, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'KCAL', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 0.4, alert_tele: 'yes', gain_tele: 0.5, count: 0, count_interval: 45 },
    { amountA1: 50, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'PRIMAL', token_r: 'USDC', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 0.4, alert_tele: 'yes', gain_tele: 0.5, count: 0, count_interval: 45 },
    { amountA1: 200, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'SPEX', token_r: '', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'yes', gain_lv1: 10 },
    { amountA1: 100, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'SPEX', token_r: '', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'yes', gain_lv1: 5, alert_tele: 'yes', gain_tele: 6, count: 0, count_interval: 45 },
  ],
};

let item_t2_fitfi = {
  token_name: 'FITFI',
  chain: 'Step',
  type: 'SWAP',
  name_cex: 'Gateio',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 300,
  list_sell: [{ amountA1: 200, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'SPEX', token_r: '', name_cex: 'Gateio', cex_trade_fee: 0.003, alert_gain: 'yes', gain_lv1: 10, alert_tele: 'yes', gain_tele: 10, count: 0, count_interval: 45 }],
};

let item_t1_kcal = {
  token_name: 'KCAL',
  chain: 'Step',
  type: 'SWAP',
  name_cex: 'Bybit',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 0,
  list_sell: [
    { amountA1: 300, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 3 },
    { amountA1: 200, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 1.5 },
    { amountA1: 100, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 0.4, alert_tele: 'yes', gain_tele: 0.5, count: 0, count_interval: 45 },
  ],
};

let item_t2_kcal = {
  token_name: 'KCAL',
  chain: 'Step',
  type: 'SWAP',
  name_cex: 'Houbi',
  cex_trade_fee: 0.002,
  cex_withdraw_fee: 0,
  list_sell: [
    { amountA1: 210, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 1.5 },
    { amountA1: 100, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 0.4, alert_tele: 'yes', gain_tele: 0.5, count: 0, count_interval: 45 },
  ],
};

let item_t3_kcal = {
  token_name: 'KCAL',
  chain: 'Step',
  type: 'SWAP',
  name_cex: 'Gateio',
  cex_trade_fee: 0.003,
  cex_withdraw_fee: 8,
  list_sell: [
    //{ amountA1: 210, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 1 },
    { amountA1: 100, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 0.4, alert_tele: 'yes', gain_tele: 0.5, count: 0, count_interval: 45 },
  ],
};

let item_t1_primal = {
  token_name: 'PRIMAL',
  chain: 'Step',
  type: 'SWAP',
  name_cex: 'Bybit',
  cex_trade_fee: 0.001,
  cex_withdraw_fee: 10,
  list_sell: [
    { amountA1: 50, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: 'USDC', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 0.5 },
    //{ amountA1: 50, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'KCAL', token_r: 'USDC', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 0.5 },
  ],
};

let item_t1_spex = {
  token_name: 'SPEX',
  chain: 'Step',
  type: 'SWAP',
  name_cex: 'Gateio',
  cex_trade_fee: 0.003,
  cex_withdraw_fee: 900,
  list_sell: [
    { amountA1: 300, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 5 },
    { amountA1: 200, crosschain_fee: 0, type: 'SWAP', chain: 'Step', name_dex: 'Step', token_base: 'FITFI', token_r: '', name_cex: 'Bybit', cex_trade_fee: 0.001, alert_gain: 'yes', gain_lv1: 5, alert_tele: 'yes', gain_tele: 6, count: 0, count_interval: 45 },
  ],
};

export const item_list_1 = [
  { key: 1, data: item_o1_fitfi },
  // { key: 2, data: item_o2_fitfi },
  { key: 3, data: item_o3_fitfi },
  // { key: 4, data: item_o4_fitfi },
  // { key: 5, data: item_o1_kcal },
  { key: 14, data: item_o2_kcal },
  // { key: 15, data: item_o3_kcal },
  // { key: 23, data: item_o4_kcal },
  // { key: 6, data: item_o1_primal },
  { key: 8, data: item_o2_primal },
  // { key: 9, data: item_o3_primal },
];

export const item_list_2 = [
  { key: 10, data: item_o4_primal },
  // { key: 11, data: item_o1_rjv },
  // { key: 12, data: item_o2_rjv },
  // { key: 13, data: item_o3_rjv },
  { key: 16, data: item_o1_dao },
  { key: 17, data: item_o2_dao },
  { key: 18, data: item_o3_dao },
  // { key: 19, data: item_o1_xeta },
  // { key: 20, data: item_o2_xeta },
  // { key: 21, data: item_o3_xeta },
  // { key: 22, data: item_o4_xeta },
  // { key: 24, data: item_o5_xeta },
  { key: 25, data: item_o1_newtoken },
  //{ key: 26, data: item_o2_newtoken },
  //{ key: 27, data: item_o3_newtoken },
];

export const item_list_3 = [
  { key: 't1', data: item_t1_fitfi },
  { key: 't2', data: item_t1_kcal },
  { key: 't3', data: item_t2_kcal },
  { key: 't4', data: item_t1_primal },
  { key: 't5', data: item_t1_spex },
  { key: 't6', data: item_t2_fitfi },
  { key: 't7', data: item_t3_kcal },
];
//key max = 28

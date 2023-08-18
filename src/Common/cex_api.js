import axios from 'axios';

export const bybit_orderbook = async (tokenPair, limit) => {
  const url = `https://api.bybit.com/v5/market/orderbook?category=spot&symbol=${tokenPair}&limit=${limit}`;
  const response = await axios
    .get(url, {
      timeout: 2000,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
      return 'error';
    });
  //console.log(response);
  return response;
};

export async function get_orderbook_bybit(token) {
  token = `${token}USDT`;
  const limit = 10;
  const response = await bybit_orderbook(token, limit);
  console.log(response?.data);
  return response;
}

export const gateio_orderbook = async (tokenPair, limit) => {
  const url = `https://api.gateio.ws/api/v4/spot/order_book?currency_pair=${tokenPair}&limit=${limit}`;
  const response = await axios
    .get(url, {
      timeout: 2000,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
      return 'error';
    });
  //console.log(response);
  return response;
};

export async function get_orderbook_gateio(token) {
  token = `${token}_USDT`;
  const limit = 10;
  const response = await gateio_orderbook(token, limit);
  console.log(response?.data);
  return response;
}

export const houbi_orderbook = async (tokenPair, limit) => {
  const url = `https://api.huobi.pro/market/depth?symbol=${tokenPair.toLowerCase()}&type=step0&depth=${limit}`;
  const response = await axios
    .get(url, {
      timeout: 2000,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
      return 'error';
    });
  //console.log(response);
  return response;
};

export async function get_orderbook_houbi(token) {
  token = `${token}USDT`;
  const limit = 10;
  const response = await houbi_orderbook(token, limit);
  console.log(response?.data);
  return response;
}

export const bidget_orderbook = async (tokenPair, limit) => {
  const url = `https://api.bitget.com/api/spot/v1/market/depth?symbol=${tokenPair}&type=step0&limit=${limit}`;
  const response = await axios
    .get(url, {
      timeout: 2000,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
      return 'error';
    });
  //console.log(response);
  return response;
};

export async function get_orderbook_bidget(token) {
  token = `${token}USDT_SPBL`;
  const limit = 50;
  const response = await bidget_orderbook(token, limit);
  console.log(response?.data);
  return response;
}

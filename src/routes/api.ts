const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export const fetchCoinInfo = (coinId: string | undefined) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
};

export const fetchCoinTickers = (coinId: string | undefined) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
};

export const exchange = () => {
  return fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/krw.min.json`
  ).then((response) => response.json());
};

export const fetchCoinHistory = (coinId: string) => {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) => response.json());
};

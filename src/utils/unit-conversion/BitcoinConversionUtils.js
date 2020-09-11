export const SATOSHIS_IN_BTC = Math.pow(10, 8);

export function bitcoinToSatoshis(btcAmount) {
  return btcAmount * SATOSHIS_IN_BTC;
}

export function satoshisToBitcoin(satsAmount) {
  return satsAmount / SATOSHIS_IN_BTC;
}

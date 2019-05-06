import { pokerSymbols, suits } from './pokerData';

const pool = (() => {
  const newPool = [];
  suits.forEach((ele) => {
    pokerSymbols.forEach((num) => {
      newPool.push([num, ele]);
    });
  });
  return newPool;
})();

export default function getCard() {
  const hand = [];
  const temPool = pool.concat();

  for (let i = 2; i >= 0; i -= 1) {
    const random = Math.floor(Math.random() * temPool.length);
    hand.push(temPool[random]);
    temPool.splice(random, 1);
  }
  return hand;
}

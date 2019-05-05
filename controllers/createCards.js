import { pokerSymbols, suits } from './pokerData.js';

let pool = (() => {
  var newPool = [];
  suits.forEach(ele => {
    pokerSymbols.forEach(num => {
      newPool.push([num, ele]);
    });
  });
  return newPool;
})();

export function getCard() {
  let hand = [];
  let temPool = pool.concat();

  for (let i = 2; i >= 0; i--) {
    let random = Math.floor(Math.random() * temPool.length);
    hand.push(temPool[random]);
    temPool.splice(random, 1);
  }
  return hand;
}

import { pokerSymbols, ranks } from './pokerData';

export const Helper = {
  consecutiveNumbersCheck: (hand) => {
    const indexes = [];
    let consecutiveNumbers = true;

    hand.map(array => indexes.push(pokerSymbols.indexOf(array[0])));

    const sortedIndexes = indexes.sort((a, b) => a - b);

    if (sortedIndexes.toString() === [0, 11, 12].toString()) {
      // 如果是Q K A的情况
      consecutiveNumbers = true;
    } else {
      for (let i = 1; i < sortedIndexes.length; i += 1) {
        if (sortedIndexes[i - 1] !== sortedIndexes[i] - 1) {
          consecutiveNumbers = false;
        }
      }
    }
    return consecutiveNumbers;
  },

  sameNumberCheck: (hand) => {
    const indexes = [];

    hand.map(array => indexes.push(array[0]));

    const number = indexes.shift();
    let count = 0;

    indexes.forEach((ele) => {
      if (ele === number) count += 1;
    });
    return Boolean(count === 2);
  },

  sameSuitsCheck: (hand) => {
    const suitsInHand = [];

    hand.map(array => suitsInHand.push(array[1]));

    const suit = suitsInHand.shift();
    let count = 0;

    suitsInHand.forEach((ele) => {
      if (ele === suit) count += 1;
    });
    return Boolean(count === 2);
  },

  onePairCheck: (hand) => {
    const indexes = [];
    let onePair = false;
    hand.map(array => indexes.push(array[0]));
    if (new Set(indexes).size !== indexes.length) {
      onePair = true;
    }
    return onePair;
  },

  getResult: (hand) => {
    // 炸
    if (hand.breakdown.sameNumbers) {
      return ranks[0];
    }

    // 同花顺
    if (hand.breakdown.consecutiveNumbers && hand.breakdown.sameSuits) {
      return ranks[1];
    }

    // 同花
    if (hand.breakdown.sameSuits) {
      return ranks[2];
    }

    // 顺子
    if (hand.breakdown.consecutiveNumbers) {
      return ranks[3];
    }

    // 对子
    if (hand.breakdown.onePair) {
      return ranks[4];
    }

    // 单牌
    return ranks[5];
  },
};

export const PokerHand = function PokerHand(hand) {
  this.hand = hand;
  this.breakdown = {
    consecutiveNumbers: Helper.consecutiveNumbersCheck(hand),
    sameSuits: Helper.sameSuitsCheck(hand),
    sameNumbers: Helper.sameNumberCheck(hand),
    onePair: Helper.onePairCheck(hand),
  };
};

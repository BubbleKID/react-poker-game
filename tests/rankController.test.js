import { Helper } from '../controllers/rankController';
import { pokerSymbols, suits } from '../controllers/pokerData';

var PokerHand = function(hand) {
  this.hand = hand;
  this.breakdown = {
    consecutiveNumbers: Helper.consecutiveNumbersCheck(hand),
    sameSuits: Helper.sameSuitsCheck(hand),
    sameNumbers: Helper.sameNumberCheck(hand),
    onePair: Helper.onePairCheck(hand)
  };
};

describe('Helper 可以', () => {
  test('识别炸', () => {
    const hand = [
      [pokerSymbols[2],suits[1]], //黑桃 3
      [pokerSymbols[2],suits[2]], //梅花 3
      [pokerSymbols[2],suits[3]] //方块 3
    ];
    var playerOneHand = new PokerHand(hand);
    expect(Helper.getResult(playerOneHand)).toBe('炸');
  });

  test('识别同花顺', () => {
    const hand = [
      [pokerSymbols[2], suits[0]], //红桃 3
      [pokerSymbols[4], suits[0]], //红桃 5
      [pokerSymbols[3], suits[0]] //红桃 4
    ];
    var playerOneHand = new PokerHand(hand);
    expect(Helper.getResult(playerOneHand)).toBe('同花顺');
  });

  test('识别同花', () => {
    const hand = [
      [pokerSymbols[2], suits[0]], //红桃 3
      [pokerSymbols[4], suits[0]], //红桃 5
      [pokerSymbols[8], suits[0]] //红桃 9
    ];
    var playerOneHand = new PokerHand(hand);
    expect(Helper.getResult(playerOneHand)).toBe('同花');
  });

  test('识别顺子', () => {
    const hand = [
      [pokerSymbols[2], suits[1]], //黑桃 3
      [pokerSymbols[3], suits[2]], //梅花 4
      [pokerSymbols[4], suits[3]] //方块 5
    ];
    var playerOneHand = new PokerHand(hand);
    expect(Helper.getResult(playerOneHand)).toBe('顺子');
  });

  test('识别QKA顺子', () => {
    const hand = [
      [pokerSymbols[11], suits[3]], //方块 Q
      [pokerSymbols[12], suits[2]], //梅花 K
      [pokerSymbols[0], suits[3]] //方块 A
    ];
    var playerOneHand = new PokerHand(hand);
    expect(Helper.getResult(playerOneHand)).toBe('顺子');
  });

  test('识别对子', () => {
    const hand = [
      [suits[0], pokerSymbols[2]], //红桃 3
      [suits[1], pokerSymbols[7]], //黑桃 8
      [suits[0], pokerSymbols[7]] //红桃 8
    ];
    var playerOneHand = new PokerHand(hand);
    expect(Helper.getResult(playerOneHand)).toBe('对子');
  });

  test('识别单张', () => {
    const hand = [
      [pokerSymbols[1], suits[0]], //红桃 2
      [pokerSymbols[2], suits[1]], //黑桃 3
      [pokerSymbols[4], suits[0]] //红桃 5
    ];
    var playerOneHand = new PokerHand(hand);
    expect(Helper.getResult(playerOneHand)).toBe('单张');
  });
});

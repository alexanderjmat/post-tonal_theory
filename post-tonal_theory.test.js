const { PitchClassSet } = require('./post-tonal_theory.js');

describe('PitchClassSet', () => {
  test('constructor', () => {
    const pcs = new PitchClassSet([0, 2, 4, 6, 8, 10]);
    expect([...pcs.pcs]).toEqual([0, 2, 4, 6, 8, 10]);
  });

  test('getInterval', () => {
    expect(PitchClassSet.getInterval(1, 5)).toBe(4);
    expect(PitchClassSet.getInterval(8, 4)).toBe(8);
  });

  test('invert', () => {
    const pcs = new PitchClassSet([0, 4, 7]);
    pcs.invert(0);
    expect([...pcs.sort()]).toEqual([0, 5, 8]);
  });

  test('sort', () => {
    const pcs = new PitchClassSet([8, 5, 0]);
    pcs.sort();
    expect([...pcs.pcs]).toEqual([0, 5, 8]);
  });

  test('getSetLength', () => {
    const pcs = new PitchClassSet([0, 4, 7]);
    expect(pcs.getSetLength()).toBe(3);
  });

  test('transpose', () => {
    const pcs = new PitchClassSet([0, 4, 7]);
    pcs.transpose(1);
    expect([...pcs.pcs]).toEqual([1, 5, 8]);
  });

  test('findNormalOrder', () => {
    const pcs = new PitchClassSet([0, 2, 4, 6, 8, 10]);
    const normalOrder = pcs.findNormalOrder();
    expect([...normalOrder.pcs]).toEqual([0, 2, 4, 6, 8, 10]);
  });

  test('primeForm', () => {
    const pcs = new PitchClassSet([0, 8, 10, 5, 7]);
    const primeForm = pcs.primeForm();
    expect([...primeForm]).toEqual([0, 2, 3, 5, 7]);
  });
});
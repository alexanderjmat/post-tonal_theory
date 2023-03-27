class PitchClassSet {
  constructor(pcs = []) {
    this.pcs = new Set(
      pcs.map((pitch) => {
        return pitch % 12;
      })
    );
  }

  static getInterval(bottom, top) {
    let distance = top - bottom;
    top < bottom ? (distance = (distance + 12) % 12) : distance;
    return distance;
  }

  print() {
    console.log(this.pcs);
    return this.pcs;
  }

  invert(n) {
    n = n % 12;
    this.pcs = new Set(
      [...this.pcs].map((pitch) => {
        let distance = n - pitch;
        distance < 0
          ? (distance = (distance + 12) % 12)
          : (distance = distance);

        return distance % 12;
      })
    );
    return this;
  }

  sort() {
    this.pcs = new Set(
      [...this.pcs].sort((a, b) => {
        return a - b;
      })
    );
    return this.pcs;
  }

  getSetLength() {
    return [...this.pcs].length;
  }

  transpose(n) {
    this.pcs = new Set(
      [...this.pcs].map((pitch) => {
        return ((pitch + n) % 12 + 12) % 12;
      })
    );
    return this.pcs;
  }

  findNormalOrder() {
    const sortedPcs = Array.from(this.pcs).sort((a, b) => a - b);
    const rotations = sortedPcs.map((_, i) => {
      const rotated = sortedPcs.slice(i).concat(sortedPcs.slice(0, i));
      const intervals = rotated.map((val, idx) => {
        if (idx === 0) return 0;
        return (rotated[idx] - rotated[idx - 1] + 12) % 12;
      });
      return { rotated, intervals };
    });

    rotations.sort((a, b) => {
      const spanA = a.intervals.reduce((sum, x) => sum + x);
      const spanB = b.intervals.reduce((sum, x) => sum + x);
      if (spanA !== spanB) return spanA - spanB;

      const penultimateA = a.intervals.slice(1, -1).reduce((sum, x) => sum + x);
      const penultimateB = b.intervals.slice(1, -1).reduce((sum, x) => sum + x);
      if (penultimateA !== penultimateB) return penultimateA - penultimateB;

      return a.rotated[0] - b.rotated[0];
    });

    return new PitchClassSet([...rotations[0].rotated]);
  }

  primeForm() {
    const normalOrderSet = this.findNormalOrder();
    normalOrderSet.transpose(-normalOrderSet.pcs.values().next().value);

    const invertedSet = new PitchClassSet([...this.pcs]).invert(normalOrderSet.pcs.values().next().value);
    const ascendingInvertedOrder = Array.from(invertedSet.pcs).sort((a, b) => a - b);
    const compactInvertedOrderSet = new PitchClassSet(ascendingInvertedOrder).findNormalOrder();
    compactInvertedOrderSet.transpose(-compactInvertedOrderSet.pcs.values().next().value);

    const normalOrderSpan = [...normalOrderSet.pcs][normalOrderSet.pcs.size - 1] - normalOrderSet.pcs.values().next().value;
    const invertedOrderSpan = [...compactInvertedOrderSet.pcs][compactInvertedOrderSet.pcs.size - 1] - compactInvertedOrderSet.pcs.values().next().value;

    if (invertedOrderSpan < normalOrderSpan) {
      return compactInvertedOrderSet.pcs;
    } else {
      return normalOrderSet.pcs;
    }
  }
}

module.exports = {
    PitchClassSet
}
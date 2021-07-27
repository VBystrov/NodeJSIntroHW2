function copy(N, x, y) {
  if (N === 0) {
    return 0;
  }
  const fasterCopyTime = x < y ? x : y;
  if (N === 1) {
    return fasterCopyTime;
  }
  const medialTime = (N - 1) / (1 / x + 1 / y);
  const xAll = medialTime - (medialTime % x) + x;
  const yAll = medialTime - (medialTime % y) + y;

  return xAll < yAll ? xAll + fasterCopyTime : yAll + fasterCopyTime;
}

console.log(copy(5, 1, 2));

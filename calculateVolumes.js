function generateVolumes(pages, K) {
  let b = [];
  const N = pages.length;
  let sum = 0;
  for (let i = 0; i < N; i += 1) {
    sum += pages[i];
    b[i] = sum;
  }

  for (let j = 1; j < K; j += 1) {
    const c = [];
    for (let i = j; i < N; i += 1) {
      let min = Number.MAX_SAFE_INTEGER;
      sum = 0;
      for (let l = 0; l < i - j + 1; l += 1) {
        sum += pages[i - l];
        const t = Math.max(sum, b[i - l - 1]);
        if (t < min) {
          min = t;
        }
      }
      c[i] = min;
    }
    b = c;
  }
  return b[N - 1];
}

console.log(generateVolumes([1, 2, 1, 1], 3));

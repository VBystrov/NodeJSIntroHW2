function findKayakAmount(weights, load) {
  let kayakAmount = 0;
  const sortedWeights = [...weights].sort((a, b) => a - b);
  while (sortedWeights.length > 0) {
    const firstPersonWeight = sortedWeights.pop();
    kayakAmount += 1;
    for (let i = sortedWeights.length - 1; i >= 0; i -= 1) {
      if (firstPersonWeight + sortedWeights[i] <= load) {
        sortedWeights.splice(i, 1);
        break;
      }
    }
  }
  return kayakAmount;
}
console.log(findKayakAmount([50, 120, 74, 60, 100, 82], 135));

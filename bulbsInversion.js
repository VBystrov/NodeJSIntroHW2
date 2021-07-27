function bulbsV1(N, P) {
  console.time("bulbsV1");
  const garland = Array(N);
  P.forEach((p) => {
    for (let i = 0; i < garland.length; i += p) {
      garland[i] = !garland[i];
    }
  });

  let amount = 0;
  for (let i = 0; i < garland.length; i += 1) {
    if (garland[i]) {
      amount += 1;
    }
  }
  console.timeEnd("bulbsV1");

  return amount;
}

function bulbsV2(N, P) {
  console.time("bulbsV2");
  let amount = 0;

  for (let i = 0; i < N; i += 1) {
    let count = 0;
    P.forEach((p) => {
      if (i % p) {
        count += 1;
      }
    });
    if (count & 1) {
      amount += 1;
    }
  }

  console.timeEnd("bulbsV2");

  return amount;
}

const N = 172;
const P = [19, 2, 7, 13, 40, 23, 16, 1, 45, 9];

console.log(bulbsV1(N, P));

console.log(bulbsV2(N, P));

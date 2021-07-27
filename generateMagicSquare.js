function generateEmptySquare(N) {
  const square = Array(N);
  for (let i = 0; i < N; i += 1) {
    square[i] = Array(N);
  }
  return square;
}

function genMagicSquareOdd(N, precedingNumber = 0) {
  const square = generateEmptySquare(N);
  let num = 2 + precedingNumber;
  const amountSquareCells = N * N + precedingNumber;
  let row = 0;
  let column = Math.floor(N / 2);
  square[row][column] = 1 + precedingNumber;

  for (; num <= amountSquareCells; square[row][column] = num, num += 1) {
    if (row - 1 < 0 && column + 1 >= N) {
      row += 1;
      continue;
    }
    if (row - 1 < 0) {
      row = N - 1;
      column += 1;
      continue;
    }
    if (column + 1 > N - 1) {
      column = 0;
      row -= 1;
      continue;
    }
    if (!square[row - 1][column + 1]) {
      row -= 1;
      column += 1;
    } else {
      row += 1;
    }
  }
  return square;
}

function genMagicSquareDoublyEven(N) {
  const square = generateEmptySquare(N);
  const sideDividedByFour = N / 4;
  [
    {
      rowStart: 0,
      rowEnd: sideDividedByFour - 1,
      columnStart: sideDividedByFour,
      columnEnd: sideDividedByFour * 3 - 1,
    },
    {
      rowStart: sideDividedByFour * 3,
      rowEnd: N - 1,
      columnStart: sideDividedByFour,
      columnEnd: sideDividedByFour * 3 - 1,
    },
    {
      rowStart: sideDividedByFour,
      rowEnd: sideDividedByFour * 3 - 1,
      columnStart: 0,
      columnEnd: sideDividedByFour - 1,
    },
    {
      rowStart: sideDividedByFour,
      rowEnd: sideDividedByFour * 3 - 1,
      columnStart: sideDividedByFour * 3,
      columnEnd: N - 1,
    },
  ].forEach(({ rowStart, rowEnd, columnStart, columnEnd }) => {
    for (let row = rowStart; row <= rowEnd; row += 1) {
      for (let column = columnStart; column <= columnEnd; column += 1) {
        square[row][column] = row * N + column + 1;
      }
    }
  });
  [
    {
      rowStart: 0,
      rowEnd: sideDividedByFour - 1,
      columnStart: 0,
      columnEnd: sideDividedByFour - 1,
    },
    {
      rowStart: sideDividedByFour * 3,
      rowEnd: N - 1,
      columnStart: 0,
      columnEnd: sideDividedByFour - 1,
    },
    {
      rowStart: 0,
      rowEnd: sideDividedByFour - 1,
      columnStart: sideDividedByFour * 3,
      columnEnd: N - 1,
    },
    {
      rowStart: sideDividedByFour * 3,
      rowEnd: N - 1,
      columnStart: sideDividedByFour * 3,
      columnEnd: N - 1,
    },
    {
      rowStart: sideDividedByFour,
      rowEnd: sideDividedByFour * 3 - 1,
      columnStart: sideDividedByFour,
      columnEnd: sideDividedByFour * 3 - 1,
    },
  ].forEach(({ rowStart, rowEnd, columnStart, columnEnd }) => {
    const amountCells = N * N;
    for (let row = rowStart; row <= rowEnd; row += 1) {
      for (let column = columnStart; column <= columnEnd; column += 1) {
        square[row][column] = amountCells - (row * N + column);
      }
    }
  });
  return square;
}

function genMagicSquareSinglyEven(N) {
  const quarters = [];
  const centerOfQuarterSquare = (N - 2) / 4;
  const halfLengthOfSquare = N / 2;

  for (let i = 0; i < 4; i += 1) {
    quarters[i] = genMagicSquareOdd(halfLengthOfSquare, i * ((N * N) / 4));
  }
  for (let row = 0; row < halfLengthOfSquare; row += 1) {
    for (let column = 0; column < centerOfQuarterSquare; column += 1) {
      const buffer = quarters[0][row][column];
      quarters[0][row][column] = quarters[3][row][column];
      quarters[3][row][column] = buffer;
    }
  }

  [
    { row: centerOfQuarterSquare, column: 0 },
    { row: centerOfQuarterSquare, column: centerOfQuarterSquare },
  ].forEach(({ row, column }) => {
    const buffer = quarters[0][row][column];
    quarters[0][row][column] = quarters[3][row][column];
    quarters[3][row][column] = buffer;
  });

  for (let row = 0; row < halfLengthOfSquare; row += 1) {
    for (
      let column = halfLengthOfSquare - (N - 6) / 4;
      column < halfLengthOfSquare;
      column += 1
    ) {
      const buffer = quarters[1][row][column];
      quarters[1][row][column] = quarters[2][row][column];
      quarters[2][row][column] = buffer;
    }
  }
  const square = [];
  for (let i = 0; i < halfLengthOfSquare; i += 1) {
    square[i] = quarters[0][i].concat(quarters[2][i]);
    square[halfLengthOfSquare + i] = quarters[3][i].concat(quarters[1][i]);
  }

  return square;
}

function genMagicSquare(N) {
  if (N === 1) {
    return [1];
  }
  if (N === 2) {
    return "Impossible.";
  }
  if (N & 1) {
    return genMagicSquareOdd(N);
  }
  if (N % 4 === 0) {
    return genMagicSquareDoublyEven(N);
  }
  return genMagicSquareSinglyEven(N);
}

const length = 14;
genMagicSquare(length).forEach((r) => {
  console.log(r.map((n) => `${n}`.padStart(6)).join(""));
});

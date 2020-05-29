import { baseNumbers, namedPowersOfTen } from "./dictionary";

function underHundred(N) {
  if (N <= 20) {
    return baseNumbers[N];
  }

  let result = baseNumbers[Math.floor(N / 10) * 10];

  if (N % 10) {
    result += `-${baseNumbers[N % 10]}`;
  }

  return result;
}

function underThousand(N) {
  let result = "";

  if (N >= 100) {
    result += `${baseNumbers[Math.floor(N / 100)]} ${namedPowersOfTen[2]}`;
  }

  if (N % 100) {
    result += `${result.length ? " and " : ""}${underHundred(N % 100)}`;
  }

  return result;
}

function underTenThousand(N) {
  let result = "";

  if (N >= 100) {
    if (Math.floor(N / 100) % 10 === 0) {
      result += `${baseNumbers[Math.floor(N / 100) / 10]} ${
        namedPowersOfTen[3]
      }`;
    } else {
      result += `${baseNumbers[Math.floor(N / 100)]} ${namedPowersOfTen[2]}`;
    }
  }

  if (N % 100) {
    result += `${result.length ? " and " : ""}${underHundred(N % 100)}`;
  }

  return result;
}

export default function convertNumber(N) {
  if (N >= Math.pow(10, 21)) {
    throw new Error('Too large number: N < 10^21');
  }

  if (!N) {
    return baseNumbers[0];
  }

  if (N < 10000) {
    return underTenThousand(N)
  } else {
    let result = '';
    let remainder = N;

    const highestNamedPowerOfTen = Math.log10(N) - Math.log10(N) % 3;


    for (let i = highestNamedPowerOfTen; i > 0; i -= 3) {
      const M = Math.floor(remainder / Math.pow(10, i))

      if (M) {
        result += `${result.length ? ' ' : ''}${underThousand(M)} ${namedPowersOfTen[i]}`;

        remainder -= M * Math.pow(10, i);
      }
    }

    if (remainder) {
        result += `${remainder < 100 ? ' and ' : ' '}${underTenThousand(remainder)}`;
    }

    return result;
  }
}

window.convertNumber = convertNumber;

export function shuffle<T>(arr: T[], iterations = 1) {
  if (iterations <= 0 || arr.length === 0) {
    return arr;
  }

  const max = arr.length - 1;
  const res = [...arr];
  for (const idx in res) {
    const nIdx = _getRandom(max);
    const val = res[idx];
    res[idx] = res[nIdx];
    res[nIdx] = val;
  }

  return shuffle(res, iterations - 1);
}

function _getRandom(max: number) {
  return Math.round(Math.random() * max);
}

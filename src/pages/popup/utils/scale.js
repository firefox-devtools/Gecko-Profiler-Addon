export function makeExponentialScale(rangeStart, rangeEnd) {
  const startExp = Math.log(rangeStart);
  const endExp = Math.log(rangeEnd);
  const fromFractionToValue = frac =>
    Math.exp((1 - frac) * startExp + frac * endExp);
  const fromValueToFraction = value =>
    (Math.log(value) - startExp) / (endExp - startExp);
  const fromFractionToSingleDigitValue = frac => {
    return +fromFractionToValue(frac).toPrecision(1);
  };
  return {
    fromFractionToValue,
    fromValueToFraction,
    fromFractionToSingleDigitValue,
  };
}

function lerp(frac, rangeStart, rangeEnd) {
  return (1 - frac) * rangeStart + frac * rangeEnd;
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function scaleRangeWithClamping(
  val,
  sourceRangeStart,
  sourceRangeEnd,
  destRangeStart,
  destRangeEnd
) {
  const frac = clamp(
    (val - sourceRangeStart) / (sourceRangeEnd - sourceRangeStart),
    0,
    1
  );
  return lerp(frac, destRangeStart, destRangeEnd);
}

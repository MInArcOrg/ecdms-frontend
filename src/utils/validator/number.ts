import * as yup from 'yup';

export const limitNumberDigits = (
  schema: yup.NumberSchema<number | null | undefined>,
  {
    maxIntegerDigits,
    maxDecimalPlaces,
    integerMessage,
    decimalMessage
  }: {
    maxIntegerDigits: number;
    maxDecimalPlaces: number;
    integerMessage?: string;
    decimalMessage?: string;
  }
) => {
  return schema
    .test('maxIntegerDigits', integerMessage ?? `Must be at most ${maxIntegerDigits} digits`, function (value) {
      if (value === null || value === undefined) return true;
      const raw = this.originalValue;
      const normalized = String(raw ?? value).replace(/,/g, '').trim();
      if (!normalized) return true;
      const match = normalized.match(/^(-?\d+)(?:\.(\d+))?$/);
      if (!match) return true;
      const intPart = match[1].replace(/^-/, '');
      return intPart.length <= maxIntegerDigits;
    })
    .test(
      'maxDecimalPlaces',
      decimalMessage ?? `Must have at most ${maxDecimalPlaces} decimal places`,
      function (value) {
        if (value === null || value === undefined) return true;
        const raw = this.originalValue;
        const normalized = String(raw ?? value).replace(/,/g, '').trim();
        if (!normalized) return true;
        const match = normalized.match(/^(-?\d+)(?:\.(\d+))?$/);
        if (!match) return true;
        const decimals = match[2] || '';
        return decimals.length <= maxDecimalPlaces;
      }
    );
};


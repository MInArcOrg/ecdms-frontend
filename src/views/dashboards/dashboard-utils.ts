export const safeNumber = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

export const formatCompactNumber = (value: number) => {
  if (!Number.isFinite(value)) return '0';
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return String(value);
};

export type BreakdownType = Record<string, number>;

export type DashboardSummary = {
  stakeholder?: { total?: number; types?: BreakdownType[] };
  project?: { total?: number; types?: BreakdownType[] };
  resource?: { total?: number; types?: BreakdownType[] };
  document?: { total?: number; types?: BreakdownType[] };
};

export const getTypeCount = (types: BreakdownType[] | undefined, matchers: string[]) => {
  const matcherSet = matchers.map((m) => m.toLowerCase());
  return (types || []).reduce((sum, obj) => {
    const entry = Object.entries(obj)[0];
    if (!entry) return sum;
    const [label, value] = entry;
    const lower = String(label || '').toLowerCase();
    const matched = matcherSet.some((m) => lower.includes(m));
    return matched ? sum + safeNumber(value) : sum;
  }, 0);
};

export const humanizeKey = (key: string) => {
  const withSpaces = String(key || '').replace(/_/g, ' ');
  return withSpaces.replace(/\b\w/g, (m) => m.toUpperCase());
};

export const normalizeBreakdown = (types: BreakdownType[] | undefined) => {
  return (types || [])
    .map((obj) => {
      const entry = Object.entries(obj)[0];
      const key = String(entry?.[0] || '');
      const value = safeNumber(entry?.[1]);
      return { key, label: humanizeKey(key), value };
    })
    .filter((x) => x.key)
    .sort((a, b) => b.value - a.value);
};

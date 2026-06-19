export function exportCSV<T extends Record<string, any>>(
  data: T[],
  headers: { label: string; key: keyof T }[],
  filename: string = 'data.csv'
) {
  const headerRow = headers.map(h => h.label).join(',');
  const rows = data.map(row => headers.map(h => row[h.key]).join(','));
  const csv = [headerRow, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
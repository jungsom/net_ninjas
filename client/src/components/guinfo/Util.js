export function StringSplitAndSort(string) {
  const strings = string.split(',').map((items) => items.trim());
  return strings.sort((a, b) => (a > b ? 1 : -1)).join(', ');
}

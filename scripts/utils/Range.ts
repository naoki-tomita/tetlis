export function range(start: number, size: number) {
  return Array(size).fill(null).map((_, i) => i + start);
}

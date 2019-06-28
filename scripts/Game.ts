export function loop(cb: () => void, interval: number) {
  cb(), setTimeout(() => loop(cb, interval), interval);
}

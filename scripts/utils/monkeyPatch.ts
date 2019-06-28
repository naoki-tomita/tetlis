declare interface Console {
  reset(): void;
}

console.reset = function () {
  return process.stdout.write("\033c");
}

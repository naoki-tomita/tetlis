import { Observable } from "./utils/Observable";

export enum InputType {
  UP = "\u001B\u005B\u0041",
  RIGHT = "\u001B\u005B\u0043",
  DOWN = "\u001B\u005B\u0042",
  LEFT = "\u001B\u005B\u0044",
  EXIT = "\u0003",
}
export class Input extends Observable {
  constructor() {
    super();
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);
    this.init();
  }

  init() {
    process.stdin.on("data", (chunk: InputType) => {
      switch (chunk) {
        case InputType.EXIT:
          process.exit();
          return;
      }
      this.emit("input", chunk.trim());
    });
  }
}

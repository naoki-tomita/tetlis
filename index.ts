import { Input, InputType } from "./scripts/Input";
import { View } from "./scripts/View";
import { Tetlis, MinoMove } from "./scripts/Tetlis";
import { loop } from "./scripts/Game";

function mapToMinoMove(input: InputType) {
  switch (input) {
    case InputType.LEFT:
      return MinoMove.LEFT;
    case InputType.RIGHT:
      return MinoMove.RIGHT;
    case InputType.DOWN:
      return MinoMove.DOWN;
  }
}

function main() {
  const input = new Input();
  const view = new View();
  const model = new Tetlis(10, 10);

  input.on("input", (type: InputType) => type === InputType.UP ? model.rotateMino() : model.moveMino(mapToMinoMove(type)));
  loop(() => view.write(model.data), 1000 / 60);
  loop(() => model.tick(), 1000);
}

main();

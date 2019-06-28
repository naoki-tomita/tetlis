import { Board } from "./Board";
import { Mino } from "./Mino";

const MinoIndex = ["T", "L", "O", "I", "Z", "N"];
const Minos = {
  T: [
    [false, true, false],
    [true, true, true],
  ],
  L: [
    [true, false, false],
    [true, true, true],
  ],
  O: [
    [true, true],
    [true, true],
  ],
  I: [
    [true, true, true, true],
  ],
  Z: [
    [true, true, false],
    [false, true, true],
  ],
  N: [
    [false, true, true],
    [true, true, false],
  ],
  get(index: number) {
    const mino = Minos[MinoIndex[index]] as boolean[][];
    return [...mino.map((line) => [...line])];
  }
}

export enum MinoMove {
  DOWN,
  ROTATE,
  LEFT,
  RIGHT,
}
export class Tetlis {
  mino: Mino;
  board: Board;

  get data() {
    return this.board.data.map((line, i) => {
      return line.map((d, j) => {
        const m = this.mino.get(j, i);
        if (m) {
          return m;
        }
        return d;
      });
    });
  }

  constructor(width: number, height: number) {
    this.board = new Board(
      Array(height).fill(null).map(
        () => Array(width).fill(null).map(() => false),
      ),
    );
    this.mino = this.getMino();
  }

  tick() {
    if (!this.board.isAcceptable(this.mino.preMove(0, 1))) {
      this.board.accept(this.mino);
      this.mino = this.getMino();
    } else {
      this.mino.move(0, 1);
    }
    this.board.fulfilled();
  }

  private getMino() {
    return  new Mino(
      Minos.get(Math.floor(Math.random() * MinoIndex.length)),
      Math.floor(this.board.data[0].length / 2),
      0,
    );
  }

  moveMino(type: MinoMove) {
    let dx = 0, dy = 0;
    switch (type) {
      case MinoMove.DOWN:
        dy++;
        break;
      case MinoMove.LEFT:
        dx--;
        break;
      case MinoMove.RIGHT:
        dx++;
        break;
    }
    if (
      this.board.isAcceptable(this.mino.preMove(dx, dy)) &&
      !this.board.isOverhang(this.mino.preMove(dx, dy))
    ) {
      this.mino.move(dx, dy);
    }
  }

  rotateMino() {
    this.mino.rotate();
  }
}

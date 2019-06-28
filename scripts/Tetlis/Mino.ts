import { range } from "../utils/Range";

export class Mino {
  data: boolean[][];
  x: number;
  y: number;
  constructor(data: boolean[][], x: number, y: number) {
    this.data = data;
    this.x = x;
    this.y = y;
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  preMove(dx: number, dy: number) {
    return new Mino(this.data, this.x + dx, this.y + dy);
  }

  get(x: number, y: number) {
    return this.data[y - this.y] ? this.data[y - this.y][x - this.x] : undefined;
  }

  rotate() {
    const newData = range(0, this.data[0].length).map(() => range(0, this.data.length).map(() => false));
    for (let y = 0; y < this.data.length; y++) {
      for (let x = 0; x < this.data[0].length; x++) {
        newData[x][this.data.length - y - 1] = this.data[y][x];
      }
    }
    this.data = newData;
  }
}

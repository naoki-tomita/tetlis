import { Mino } from "./Mino";
import { range } from "../utils/Range";

export class Board {
  data: boolean[][];
  constructor(
    data: boolean[][] =
      Array(10).fill(null).map(() => Array(10).fill(null).map(() => false))
  ) {
    this.data = data;
  }

  isAcceptable(mino: Mino) {
    const { x, y, data } = mino;
    return data.every((line, i) => {
      return line.every((d, j) => {
        // 一番上から飛び出してたら無視する
        if (d && y + i < 0) {
          return true;
        }
        // 一番下から飛び出してないか
        if (d && y + i === this.data.length) {
          return false;
        }
        // 他のブロックと重なっていないか
        if (d && this.data[y + i][x + j]) {
          return false;
        }
        return true;
      });
    });
  }

  isOverhang(mino: Mino) {
    const { x, data } = mino;
    return x < 0 || x + data[0].length > this.data[0].length
  }

  accept(mino: Mino) {
    const { x, y, data } = mino;
    data.forEach((line, i) => {
      line.forEach((d, j) => {
        d && (this.data[y + i][x + j] = true);
      });
    });
  }

  fulfilled() {
    const nextData = this.data.filter(line => {
      return !line.every(d => d);
    });
    range(0, this.data.length - nextData.length)
      .forEach(() => nextData.unshift(range(0, this.data[0].length).map(() => false)));
    this.data = nextData;
  }
}

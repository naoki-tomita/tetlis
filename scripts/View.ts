import "./utils/monkeyPatch";

export class View {
  write(data: boolean[][], debug?: any) {
    console.reset();
    console.log(data.map(d => d.map(a => a ? "0" : " ").join("")).join("\n"));
    debug != null && console.log(debug);
  }
}

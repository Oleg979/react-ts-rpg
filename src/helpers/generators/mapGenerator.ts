export default class MapGenerator {
  height: number;
  width: number;

  private X: number;
  private Y: number;

  map: string[][];

  private numOfChests: Number;
  private numOfSecrets: Number;

  constructor(
    height: number,
    width: number,
    numOfChests: number,
    numOfSecrets: number
  ) {
    this.height = height;
    this.width = width;
    this.numOfChests = numOfChests;
    this.numOfSecrets = numOfSecrets;
    this.X = this.Y = 0;
    this.map = new Array();
    for (let i = 0; i < height; i++) {
      this.map[i] = new Array();
      for (let j = 0; j < width; j++) {
        this.map[i][j] = " ";
      }
    }
  }

  private getRandomInt(min: number, max: number): number {
    const Amin = Math.ceil(min);
    const Amax = Math.floor(max);
    return Math.floor(Math.random() * (Amax - Amin + 1)) + Amin;
  }

  private getRandomLength(): number {
    return this.getRandomInt(3, 8);
  }

  private isDirectionPossible(dir: number, len: number): boolean {
    switch (dir) {
      case 0:
        return this.Y - len >= 0;
      case 1:
        return this.X + len < this.width;
      case 2:
        return this.Y + len < this.height;
      case 3:
        return this.X - len >= 0;
      default:
        return false;
    }
  }

  private fill(dir: number, len: number) {
    for (let i = 0; i < len; i++) {
      this.map[this.Y][this.X] = "*";
      switch (dir) {
        case 0:
          this.Y--;
          break;
        case 1:
          this.X++;
          break;
        case 2:
          this.Y++;
          break;
        case 3:
          this.X--;
          break;
      }
    }
  }

  private getRandomDirection(len: number): number {
    let dir: number;
    do {
      dir = this.getRandomInt(0, 3);
    } while (!this.isDirectionPossible(dir, len));
    return dir;
  }

  generate(): string[][] {
    for (let i = 0; i < 650; i++) {
      let len = this.getRandomLength();
      let dir = this.getRandomDirection(len);
      this.fill(dir, len);
    }
    this.addChests();
    this.addSecrets();
    this.addPlayer();
    return this.map;
  }

  getAsString(): string {
    let res = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        res += this.map[i][j];
      }
      res += "\n";
    }
    return res;
  }

  private addChests() {
    let x, y;
    for (let i = 0; i < this.numOfChests; i++) {
      do {
        x = this.getRandomInt(0, this.height - 1);
        y = this.getRandomInt(0, this.width - 1);
      } while (this.map[x][y] !== "*");
      this.map[x][y] = "1";
    }
  }

  private addSecrets() {
    let x, y;
    for (let i = 0; i < this.numOfSecrets; i++) {
      do {
        x = this.getRandomInt(0, this.height - 1);
        y = this.getRandomInt(0, this.width - 1);
      } while (this.map[x][y] !== "*");
      this.map[x][y] = "2";
    }
  }

  private addPlayer() {
    this.map[0][0] = "3";
  }
}

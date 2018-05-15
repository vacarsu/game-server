export class Player {
  constructor (
    public animation: string,
    public heroColor: string,
    public x: number,
    public y: number
  ) {
    this.heroColor = heroColor;
    this.x = x;
    this.y = y;
  }
}
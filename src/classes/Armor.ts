import Item from "./Item";

export default class Armor extends Item {
  defense: number;

  constructor(name: string, price: number, defense: number) {
    super(name, price);
    this.defense = defense;
  }
}

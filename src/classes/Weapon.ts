import Item from "./Item";

export default class Weapon extends Item {
  damage: number;

  constructor(name: string, price: number, damage: number) {
    super(name, price);
    this.damage = damage;
  }
}

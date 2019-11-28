import Weapon from "./Weapon";
import Armor from "./Armor";

export default class Character {
  name: string;
  HP: number;
  maxHP: number;
  damage: number;
  lvl: number = 1;
  weapon?: Weapon;
  armor?: Armor;

  constructor(name: string, HP: number, damage: number) {
    this.name = name;
    this.HP = this.maxHP = HP;
    this.damage = damage;
  }
}

export class Pilot {
  id: number;
  name: string;
  lastRaceIndex: number;

  constructor(id: number, name: string, lastRaceIndex: number) {
    this.id = id;
    this.name = name;
    this.lastRaceIndex = lastRaceIndex;
  }
}

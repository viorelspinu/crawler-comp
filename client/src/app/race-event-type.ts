export class RaceEventType {
  id: number;
  points: number;
  name: string;
  code: string;

  constructor(id: number, points: number, name: string) {
    this.points = points;
    this.name = name;
    this.id = id;
  }
}

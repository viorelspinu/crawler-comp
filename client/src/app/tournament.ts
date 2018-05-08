export class Tournament {
  id: number;
  name: string;
  date: string;
  finished: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

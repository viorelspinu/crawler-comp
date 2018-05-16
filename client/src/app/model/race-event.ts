export class RaceEvent {
  seconds: number;
  eventTypeId: number;
  points: number;
  name: string;

  constructor(
    eventTypeId: number,
    seconds: number,
    points: number,
    name: string
  ) {
    this.eventTypeId = eventTypeId;
    this.seconds = seconds;
    this.points = points;
    this.name = name;
  }
}

import { PilotRaceEvent } from './pilot-race-event';
import { PilotRaceTotal } from './pilot-race-total';

export class PilotTournamentResults {
  pilotId: number;
  bestRaceIndex: number;
  bestRacePoints: number;
  raceEvents: PilotRaceEvent[];
  raceTotals: PilotRaceTotal[];
}

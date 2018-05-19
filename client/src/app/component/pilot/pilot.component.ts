import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { mergeMap } from 'rxjs/operators';


import { PilotService } from '../../service/pilot.service';
import { TournamentService } from '../../service/tournament.service';
import { Pilot } from '../../model/pilot';
import { PilotRaceEvent } from '../../model/pilot-race-event';
import { PilotRaceTotal } from '../../model/pilot-race-total';
import { PilotTournamentResults } from '../../model/pilot-tournament-results';


@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {
  pilot: Pilot;
  pilotTournamentResult: PilotTournamentResults;

  constructor(
    public route: ActivatedRoute,
    public pilotService: PilotService,
    public tournamentService: TournamentService,
    public location: Location
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.pilotService.getPilotById(id).pipe(
      mergeMap(pilot => {
        this.pilot = pilot;
        return this.tournamentService.getPilotTournamentEvents(this.pilot.id);
      })).subscribe(
        results => { this.pilotTournamentResult = results }
      );
  }

  filterEvents(raceIndex: number): PilotRaceEvent[] {
    return this.pilotTournamentResult.raceEvents.filter
      (
      event => { return event.raceIndex == raceIndex }
      );
  }
}

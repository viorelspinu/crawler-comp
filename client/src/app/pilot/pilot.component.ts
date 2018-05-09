import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PilotService } from '../pilot.service';
import { RaceService } from '../race.service';
import { TournamentService } from '../tournament.service';
import { Pilot } from '../pilot';
import { Router } from '@angular/router';
import { PilotRaceEvent } from '../pilot-race-event';

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {
  pilot: Pilot;
  rawPilotRaceEvents: PilotRaceEvent[];

  results: PilotRaceEvent[][];
  resultsTotal: number[];

  constructor(
    private route: ActivatedRoute,
    private pilotService: PilotService,
    private raceService: RaceService,
    private tournamentService: TournamentService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pilotService.getPilotById(id).subscribe(pilot => {
      this.pilot = pilot[0];
      this.tournamentService
        .getPilotTournamentEvents(this.pilot.id)
        .subscribe(results => {
          this.rawPilotRaceEvents = results;
          this.computePilotResultsForDisplay();
        });
    });
  }

  computePilotResultsForDisplay(): void {
    this.results = [];
    this.resultsTotal = [];

    if (this.rawPilotRaceEvents.length === 0) {
      return;
    }
    let i = 0;
    let j = 0;
    let total = 0;
    let raceIndex = this.rawPilotRaceEvents[0].raceIndex;
    this.results[0] = [];
    for (const event of this.rawPilotRaceEvents) {
      if (!(event.raceIndex === raceIndex)) {
        raceIndex = event.raceIndex;
        this.resultsTotal[i] = total;
        total = 0;
        i++;
        this.results[i] = [];
        j = 0;
      }
      console.log('i=' + i);
      console.log('j=' + j);
      this.results[i][j] = event;
      total = total + event.points;
      j++;
    }
    this.resultsTotal[i] = total;
  }
}

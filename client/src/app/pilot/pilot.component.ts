import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PilotService } from '../pilot.service';
import { RaceService } from '../race.service';
import { TournamentService } from '../tournament.service';
import { Pilot } from '../pilot';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {
  pilot: Pilot;

  constructor(
    private route: ActivatedRoute,
    private pilotService: PilotService,
    private raceService: RaceService,
    private tournamentService: TournamentService,
    private location: Location,
    private router: Router
  ) {}

  startTryForThisPilot(): void {
    this.raceService.activePilot = this.pilot;
    this.raceService.activePilot.lastRaceIndex =
      this.raceService.activePilot.lastRaceIndex + 1;
    this.pilotService
      .updatePilotTryCount(
        this.pilot.id,
        this.raceService.activePilot.lastRaceIndex
      )
      .subscribe();
    this.router.navigateByUrl('/race');
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pilotService.getPilotById(id).subscribe(pilot => {
      this.pilot = pilot[0];
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../service/tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  constructor(
    public tournamentService: TournamentService,
    public router: Router
  ) {}

  ngOnInit() {}
}

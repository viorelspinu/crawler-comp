import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTournamentComponent } from './create-new-tournament.component';

describe('CreateNewTournamentComponent', () => {
  let component: CreateNewTournamentComponent;
  let fixture: ComponentFixture<CreateNewTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

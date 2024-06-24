import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Team } from '../../models/team';
import { NgFor } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TeamDetailComponent } from '../team-detail/team-detail.component';
import { TeamListComponent } from '../team-list/team-list.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, MatSidenavModule, TeamDetailComponent, TeamListComponent, TopBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  teams? : Team[];
  sidenavOpened : boolean = true;

  constructor(protected db : DbService) {
    db.getTeams().subscribe(t => this.teams = t);
  }

  toggleSidenav($event : boolean) {
    this.sidenavOpened = $event;
  }
}

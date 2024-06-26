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

  teams : Team[] = [];
  sidenavOpened : boolean = true;
  selectedTeam? : Team

  newTeam : Team = {
    name: "",
    id : 0,
    city: "",
    division: "",
    league: ""
  }

  constructor(protected db : DbService) {
    db.getTeams().subscribe(t => this.teams = t);
  }

  toggleSidenav($event : boolean) {
    this.sidenavOpened = $event;
  }

  selectTeam($event : Team) {
    this.selectedTeam = $event;
  }

  addTeam($event : boolean) {
    console.log("Made it here!")
    this.selectedTeam = structuredClone(this.newTeam);
  }

  saveNewTeam($event : boolean) {
    this.selectedTeam!.id = (this.teams.length*-1) 
    this.teams.push(this.selectedTeam!);
    this.teams = this.teams.slice();
  }

  getPartialDivisions() : string[] {
    const divisions = new Set<string>;
    this.teams.forEach(t => divisions.add(t.division));
    let ret : string[] = []
    divisions.forEach((value, key) => ret.push(key));
    return ret;
  }

  getLeagues() : string[] {
    const leagues = new Set<string>;
    this.teams.forEach(t => leagues.add(t.league));
    let ret : string[] = []
    leagues.forEach((value, key) => ret.push(key));
    return ret;
  }

  deleteTeam($id : number) {
    this.teams = this.teams.filter(t => t.id != $id);
  }
}

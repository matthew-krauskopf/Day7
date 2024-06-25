import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../models/team';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MlbImgService } from '../../services/mlb-img.service';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [NgFor, MatButtonModule],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss'
})
export class TeamListComponent {

  @Input() teams! : Team[];
  @Output() emitter : EventEmitter<Team> = new EventEmitter<Team>();

  constructor(protected imgService : MlbImgService) {}

  selectTeam(team : Team) {
    this.emitter.emit(team);
  }

  getDivisions() : Set<string> {
    const divisions = new Set<string>;
    this.teams.forEach(t => divisions.add(this.formatDiv(t)));
    return divisions;
  }

  printMe() {
    console.log(this.sortTeams(this.getDivisions()));
  }

  sortedTeams() {
    // Cannot iterate through a map. Gonna need to flatten
    const m : Map<string, Team[]> = this.sortTeams(this.getDivisions());

    const ret : Team[][] = [];
    m.forEach((value, key) => ret.push(value));
    return ret;
  }

  sortTeams(divisions : Set<string>) : Map<string, Team[]> {
    const sorted = new Map<string, Team[]>;
    divisions.forEach(d => sorted.set(d, []));
    this.teams.forEach(t => sorted.get(this.formatDiv(t))!.push(t))
    return sorted;
  }

  formatDiv(team : Team) : string {
    return team.league + team.division;
  }
}
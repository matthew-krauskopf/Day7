import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Team } from '../../models/team';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MlbImgService } from '../../services/mlb-img.service';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatDividerModule],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss'
})
export class TeamListComponent {

  @Input() teams! : Team[];
  @Output() emitter : EventEmitter<Team> = new EventEmitter<Team>();

  teamsByDiv : Team[][] = [];

  ngOnChanges(changes : SimpleChanges) {
    for (const change in changes) {
      if (change === "teams") {
        this.sortedTeams();
      }
    }
  }

  constructor(protected imgService : MlbImgService) {}

  divOrder : string[] = ["E", "C", "W"];

  selectTeam(team : Team) {
    this.emitter.emit(team);
  }

  getFullDivisions() : Set<string> {
    const divisions = new Set<string>;
    this.teams.forEach(t => divisions.add(this.formatFullDiv(t)));
    return divisions;
  }

  sortedTeams() {
    // Cannot iterate through a map. Gonna need to flatten
    const m : Map<string, Team[]> = this.sortTeams(this.getFullDivisions());

    this.teamsByDiv = [];
    m.forEach((value, key) => this.teamsByDiv.push(value.sort((a,b) => a.city.charCodeAt(0) - b.city.charCodeAt(0))));
  }

  sortTeams(divisions : Set<string>) : Map<string, Team[]> {
    const sorted = new Map<string, Team[]>;
    divisions.forEach(d => sorted.set(d, []));
    this.teams.forEach(t => sorted.get(this.formatFullDiv(t))!.push(t))
    return sorted;
  }

  formatFullDiv(team : Team) : string {
    return team.league + team.division;
  }
}
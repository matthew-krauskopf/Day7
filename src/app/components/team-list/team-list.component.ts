import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../models/team';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss'
})
export class TeamListComponent {

  @Input() teams! : Team[];
  @Output() emitter : EventEmitter<Team> = new EventEmitter<Team>();

  selectTeam(team : Team) {
    this.emitter.emit(team);
  }
}

import { Component, Input } from '@angular/core';
import { Team } from '../../models/team';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.scss'
})
export class TeamDetailComponent {

  @Input() team? : Team;
}

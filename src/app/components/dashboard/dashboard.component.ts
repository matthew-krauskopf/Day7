import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Team } from '../../models/team';
import { NgFor } from '@angular/common';
import { Observable, catchError, of} from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  teams? : Team[];

  constructor(protected db : DbService) {
   db.getTeams().subscribe(t => this.teams = t);
  }
}

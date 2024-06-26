import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Team } from '../../models/team';
import { NgFor, NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MlbImgService } from '../../services/mlb-img.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [NgIf, NgFor, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, FormsModule, MatSelectModule],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.scss'
})
export class TeamDetailComponent {

  constructor(protected imgService : MlbImgService) {}

  @Input() team? : Team;
  @Input() leagues? : string[];
  @Input() divisions? : string[];

  @Output() addEmitter : EventEmitter<boolean> = new EventEmitter();
  @Output() deleteEmitter : EventEmitter<number> = new EventEmitter();
  @Output() cancelEmitter : EventEmitter<boolean> = new EventEmitter();

  ngOnChanges(changes : SimpleChanges) {
    for (const change in changes) {
      if (change === "team") {
        this.tempTeam.name = this.team?.name ?? "";
        this.tempTeam.city = this.team?.city ?? "";
        this.tempTeam.league = this.team?.league ?? "";
        this.tempTeam.division = this.team?.division ?? "";
        return;
      }
    }
  }

  tempTeam : Team = {
    id: 0,
    name: "",
    city: "",
    league: this.team?.league ?? "",
    division: this.team?.division ?? ""
  }

  cancelChanges() {
    this.team = undefined;
    this.cancelEmitter.emit(true);
  }

  saveChanges() {
    if (this.tempTeam.city) this.team!.city = this.tempTeam.city;
    if (this.tempTeam.name) this.team!.name = this.tempTeam.name;
    if (this.tempTeam.league) this.team!.league = this.tempTeam.league;
    if (this.tempTeam.division) this.team!.division = this.tempTeam.division;

    if (this.team!.id == 0) {
      this.addEmitter.emit(true);
    } else {
      this.deleteEmitter.emit(-1);
    }
  }

  deleteTeam() {
    this.deleteEmitter.emit(this.team!.id);
    this.team = undefined;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
    title = "MLB Teams";
    
    @Output() emitter : EventEmitter<boolean> = new EventEmitter<boolean>();
    sidenavOpen : boolean = true;

    toggleSidenav() {
      this.sidenavOpen = !this.sidenavOpen;
      this.emitter.emit(this.sidenavOpen);
    }
}

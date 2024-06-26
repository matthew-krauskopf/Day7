import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, FormsModule, ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  readonly username = new FormControl('', [Validators.pattern('\\w{4,}')]);
  readonly password = new FormControl('', [Validators.pattern('\\w{4,}')]);

  errorMessage = signal('')

  constructor(protected snackbar : MatSnackBar, protected loginService : LoginService, private router : Router) {
    merge(this.username.statusChanges, this.username.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    this.errorMessage.set('Input must be at least 4 of only letters or numbers');
  }

  handleLogin() {
    if (this.loginService.handleLogin(this.username.value, this.password.value)) {
      this.router.navigate(["/home"]);
    } else {
      this.snackbar.open("Invalid login credentials", "Close");
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  validUsername = "testUser";
  validPassword = "testPass"; 

  handleLogin(username: string | null, password: string | null) : boolean {
    return username == this.validUsername && password == this.validPassword;
  }
}

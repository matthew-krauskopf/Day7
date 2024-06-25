import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MlbImgService {

  constructor() { }

  iconUrl : string = "https://midfield.mlbstatic.com/v1/team/{}/spots/33"

  getTeamIcon(id : number) {
    return this.iconUrl.replace("{}", String(id));
  }
}

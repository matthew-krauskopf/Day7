import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MlbImgService {

  constructor() { }

  iconUrl : string = "https://midfield.mlbstatic.com/v1/team/{}/spots/33"
  logoUrl : string = "https://www.mlbstatic.com/team-logos/team-cap-on-light/{}.svg"

  getTeamIcon(id : number) {
    return this.iconUrl.replace("{}", String(id));
  }

  getTeamLogo(id: number) {
    return this.logoUrl.replace("{}", String(id));
  }
}

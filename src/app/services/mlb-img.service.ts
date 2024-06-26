import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MlbImgService {

  constructor() { }

  iconUrl : string = "https://midfield.mlbstatic.com/v1/team/{}/spots/33"
  logoUrl : string = "https://www.mlbstatic.com/team-logos/team-cap-on-light/{}.svg"

  getTeamIcon(id : number) {
    if (id > 50) {
      return this.iconUrl.replace("{}", String(id));
    } else {
      return "../../assets/new-team-logo.png"
    }
  }

  getTeamLogo(id: number) {
    if (id > 50) {
      return this.logoUrl.replace("{}", String(id));
    } else {
      return "../../assets/new-team-logo.png"
    }
  }
}

import { Injectable, NgModule } from '@angular/core';
import { Team } from '../models/team';
import { Observable, catchError, of} from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DbService {

  baseUrl : string = "https://json-server-vercel-ebon.vercel.app";
  teamsEndpoint : string = "/teams";

  public teams! : Team[];

  constructor(private http : HttpClient) {}

  getTeams() : Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl+this.teamsEndpoint)
      .pipe(
        catchError(this.handleError<Team[]>())
      );  
  }

  private handleError<T>(result? : T) { 
    return (error:any): Observable<T> => {
      console.log("Fetch failed: ", error)
      return of(result as T);
    }
  }
}

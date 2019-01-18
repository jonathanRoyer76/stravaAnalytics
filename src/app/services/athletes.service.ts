import { Injectable } from '@angular/core';
import { DetailedAthlete } from '../interfacesStrava/detailedAthlete'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Oauth2Service } from './oauth2.service';
import { UrlsStrava } from '../configuration/urlsStrava';

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  constructor(
    private http: HttpClient,
    private oauthService : Oauth2Service
  ) { }

  getLoggedInAthlete():Observable<DetailedAthlete>{

    return new Observable<DetailedAthlete>(observer=>{
      // Récupérer le token d'accès
      this.oauthService.getAccessToken().subscribe(p_access_token=>{
        // Prépare le header contenant le token
        this.http.get(UrlsStrava.URL_LOGGED_ATHLETE, {headers: {'Authorization': `Bearer `+p_access_token}}).subscribe(p_athlete=>{
          observer.next(p_athlete);
        });
      })
    })    
  }
}

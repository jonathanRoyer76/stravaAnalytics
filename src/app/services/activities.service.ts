import { Injectable } from '@angular/core';
import { SummaryActivity, DetailedActivity } from '../interfacesStrava/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UrlsStrava } from '../configuration/urlsStrava';
import { Oauth2Service } from './oauth2.service';
import { Constants } from '../configuration/constants';
import { lastActivityInterface, lastActivityClass } from '../classes/lastActivityPreview';
import { TimeMethods } from '../configuration/timeMethods';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(
    private http : HttpClient,
    private oauthService : Oauth2Service
  ) { }

  // Renvoie la dernière activité
  getLastActivity():Observable<lastActivityInterface>{
    return new Observable<lastActivityInterface>(observer=>{
      this.oauthService.getAccessToken().subscribe(p_accessToken=>{
        if (p_accessToken){
          let headers : HttpHeaders = new HttpHeaders()
            .set(Constants.HEADER_AUTHORIZATION, Constants.BASE_TOKEN + p_accessToken)
          this.getCompleteActivitiesList().subscribe(p_list =>{
            if (p_list){
              let id = p_list[0]['id']
              this.http.get(UrlsStrava.URL_ACTIVITY+id,{headers: headers}).subscribe(data=>{
                if (data){
                  let returnValue: lastActivityInterface = new lastActivityClass();
                  let p_activity = data as DetailedActivity;
                  returnValue.activityId     = p_activity.id;
                  returnValue.activityName   = p_activity.name;
                  returnValue.startDate      = p_activity.start_date_local;
                  returnValue.map            = p_activity.map;
                  returnValue.duration       = TimeMethods.convertSecondsInHours(p_activity.moving_time);                  
                  returnValue.distance       = parseFloat((p_activity.distance/1000).toFixed(3));
                  returnValue.calories       = p_activity.calories;
                  returnValue.startLongitude = p_activity.start_latlng;
                  returnValue.averageSpeed   = TimeMethods.convertSecondsInMinutes(
                    parseInt(
                      ((p_activity.moving_time/(p_activity.distance/1000))).toString()
                    )
                  );
                  observer.next(returnValue);
                }
              })
            }
          })
        }else{
          console.error(`Token d'accès non obtenu`)
        }
      })
    })
  }

  // Renvoie la liste complète des activités du compte
  getCompleteActivitiesList():Observable<SummaryActivity[]>{
    return new Observable<SummaryActivity[]>(observer=>{
      this.oauthService.getAccessToken().subscribe(p_accessToken=>{
        if (p_accessToken){
          this.http.get(UrlsStrava.URL_ACTIVITIES_LIST, {headers: {'Authorization':'Bearer '+p_accessToken}})
            .subscribe(p_activtiesSummary=>{
              observer.next(<SummaryActivity[]>p_activtiesSummary);
            })
        }else{
          console.error('Erreur dans la méthode getCompleteActivitiesList du service activities');
        }
      })
    })
  }

  // Renvoie la liste des activités du compte couvrant une période donnée
  getPeriodActivitiesList(p_startPeriod, p_endPeriod):Observable<SummaryActivity[]>{
    return new Observable<SummaryActivity[]>(observer=>{
      // Si on a les périodes
      if (p_startPeriod && p_endPeriod){  
        // Récup du token
        this.oauthService.getAccessToken().subscribe(p_accessToken=>{        
            // Construction des options de la requète
          let options = {
            params: new HttpParams()
              .set('before',p_startPeriod)
              .set('after',p_endPeriod)
              .set('per_page','200'), 
            headers: new HttpHeaders()
              .set(Constants.HEADER_AUTHORIZATION, Constants.BASE_TOKEN + p_accessToken)
          } 
          // Exécution de la requète HTTP
          this.http.get(UrlsStrava.URL_ACTIVITIES_LIST, options).subscribe((data: SummaryActivity[])=>{
            observer.next(data);
          },
          p_error=>{
            console.error(`Erreur dans la récupération des activités de la période donnée.`)
          })
        })  
      }else{
        // Il manque une ou plusieurs périodes
        if (p_startPeriod)
          console.error(`Période de fin manquante`)
        else{
          if (p_endPeriod)
            console.error(`Période de début manquante`)
          else  
            console.error(`Aucune période reçue`)
        }
        return null;
      }
    })    
  }
}

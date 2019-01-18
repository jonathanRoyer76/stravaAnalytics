import { Injectable } from '@angular/core';
import { Configuration } from '../classes/configStrava';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UtilsMethods } from '../configuration/utils';
import { Observable, BehaviorSubject } from 'rxjs';
import { UrlsStrava } from '../configuration/urlsStrava'
import { SummaryAthlete } from '../interfacesStrava/models';
import { Constants } from '../configuration/constants';

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service { 

  // Subject permettant de savoir si l'on est connecté ou non
  public isConnectedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userConnectedSubject : BehaviorSubject<SummaryAthlete> = new BehaviorSubject<SummaryAthlete>(null);

  constructor(
    private http         : HttpClient,
    private configuration: Configuration  // Configuration de la connexion
  ) {
   }

  // lance la procédure d'authentification
  authenticate(){

    // Ouvre une nouvelle fenêtre pour obtenir les autorisations
    window.open(`${UrlsStrava.URL_AUTHORIZE}?client_id=${this.configuration.client_id}&redirect_uri=${this.configuration.redirect_uri}&approval_prompt=${this.configuration.approval_prompt}&response_type=${this.configuration.response_type}&scope=${this.configuration.scope}`)
    
  }

  // Révoque les droits de l'application sur le compte de l'athlète
  revokAccountAccess():Observable<boolean>{
    return new Observable<boolean>(observer=>{
      this.getAccessToken().subscribe(p_accessToken=>{
        let headers : HttpHeaders = new HttpHeaders()
            .set(Constants.HEADER_AUTHORIZATION, Constants.BASE_TOKEN + p_accessToken)
        this.http.post(UrlsStrava.URL_DEAUTHORIZE,null, { headers: headers }).subscribe(p_returnValue=>{
          if (p_returnValue){
            localStorage.clear();
            this.isConnectedSubject.next(false);
            this.userConnectedSubject.next(null);
            console.log('revokAccountAcces OK')
            observer.next(true)
          }
        })
      })
    })
  }

  // Récupère un token une fois authentifié
  obtainAccessToken():Observable<Configuration>{ 
    return new Observable<Configuration>(observer=>{ 
      this.http.post(UrlsStrava.URL_TOKEN, this.configuration).subscribe(data=>{
        this.configuration.accessToken=data['access_token'];
        this.configuration.refresh_token=data['refresh_token'];
        this.configuration.expires_at=data['expires_at'];
        this.configuration.saveConfigToLocalStorage();
        this.isConnectedSubject.next(true); 
        observer.next(this.configuration);
      }, error=>{
        console.log(`une erreur est survenue lors de l'obtention des tokens :`)
        console.log(error)  
      })    
    });
  }

  // Récupère un nouveau token en utilisant le refresh token
  refreshAccessToken():Observable<Configuration>{
    
    return new Observable<Configuration>(observer=>{
      this.configuration.grant_type='refresh_token';
      this.http.post(UrlsStrava.URL_TOKEN, this.configuration).subscribe(data=>{
        this.configuration.accessToken=data['access_token'];
        this.configuration.refresh_token=data['refresh_token'];
        this.configuration.expires_at=data['expires_at'];
        console.log('nouveau token recu : '+this.configuration.accessToken)
        this.isConnectedSubject.next(true);
        this.configuration.saveConfigToLocalStorage();
        observer.next(this.configuration)
      })
    })
  }

  // Gère les tokens
  manageTokens():Observable<Configuration>{  
    
    return new Observable<Configuration>(observer=>{
      if (this.configuration.accessToken){
        // On a un token d'accès
        if (UtilsMethods.isAccessTokenExpired(this.configuration.expires_at)){
          // Le token a expiré
          console.log('token présent mais expiré')
          this.refreshAccessToken().subscribe(returnConfig=>{
            this.isConnectedSubject.next(true);
            observer.next(returnConfig)
          });
        }else{
          // Access token toujours valide
          this.isConnectedSubject.next(true);
          observer.next(this.configuration)
        }
      }else{
        // Si pas de token d'accès
        if (this.configuration.refresh_token){
          // On a un refresh token
          this.refreshAccessToken().subscribe(returnConfig=>{
            this.isConnectedSubject.next(true);
            observer.next(returnConfig)
          });
        }        
      }
    })
  }

  // Envoie ou récupère le token accès
  getAccessToken():Observable<string>{

    return new Observable<any>(observer=>{
      if (this.configuration.accessToken && !UtilsMethods.isAccessTokenExpired(this.configuration.expires_at)){
        observer.next(this.configuration.accessToken);
      }else{
        this.manageTokens().subscribe(returnConfig=>{
          if (returnConfig){
            this.configuration = returnConfig;
            observer.next(this.configuration.accessToken);
          }
        })  
      }
    })
  }

  // Récupère la configuration contenue dans le service
  getConfiguration():Configuration{
    return this.configuration;
  }

  // Affecte une configuration et la sauvegarde
  setConfiguration(p_config: Configuration){
    this.configuration = p_config;
    this.configuration.saveConfigToLocalStorage();
  }

  // Affecte le code recu dans la config
  setCode(p_code: string){
    this.configuration.code = p_code;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Oauth2Service } from 'src/app/services/oauth2.service';
import { UtilsMethods } from 'src/app/configuration/utils';
import { AthletesService } from 'src/app/services/athletes.service';
import { SummaryAthlete, SummaryAthleteClass } from 'src/app/interfacesStrava/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Configuration } from './classes/configStrava';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']   
})
export class AppComponent implements OnInit{

  // valeur de connexion
  isConnected : boolean = false;
  userConnected: SummaryAthlete = new SummaryAthleteClass();
  config  : Configuration;

  constructor(
    private oauthService  : Oauth2Service,
    private athleteService: AthletesService,
    private router : Router,
    private route      : ActivatedRoute,
  ) 
  {}

  ngOnInit(){

    // Récupération de la Configuration dans le service
    this.config = this.oauthService.getConfiguration();
    // Récupération du code si l'on vient de s'authentifier
    this.route.queryParamMap.subscribe(paramMap =>{
      if (paramMap.get('code')){
        this.config.code = paramMap.get('code')        
        this.oauthService.setCode(this.config.code)
        this.oauthService.obtainAccessToken().subscribe(conf=>{
          this.router.navigate([`/dashboard`]);
        }); 
      }
    })

    // Pour surveiller les changements de connexion
    this.oauthService.isConnectedSubject.subscribe(p_boo=>{
      this.isConnected=p_boo;
      if (this.isConnected){
        this.athleteService.getLoggedInAthlete().subscribe(p_data=>{
          if (p_data){
            this.userConnected = p_data;    
          }
        })
      }
    })

    // Pour obtenir un nouveau token
    this.oauthService.manageTokens().subscribe(conf=>{
      
      if (conf.accessToken && !UtilsMethods.isAccessTokenExpired(conf.expires_at)){
        console.log('Token en mémoire valide : ' + conf.accessToken)
      }
    });
  }

  stravaConnection(){
    this.oauthService.authenticate();
  }

  stravaDisconnect(){
    this.oauthService.revokAccountAccess().subscribe(p_val=>{
      if (p_val){
        console.log('Component OK');
        this.router.navigate([`/`]);
      }
    })
  }

  ngOnDestroy(){
    this.oauthService.isConnectedSubject.unsubscribe();
  }

}

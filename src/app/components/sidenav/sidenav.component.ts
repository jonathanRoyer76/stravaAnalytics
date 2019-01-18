import { Component, OnInit, OnDestroy } from '@angular/core';
import { Oauth2Service } from 'src/app/services/oauth2.service';
import { UtilsMethods } from 'src/app/configuration/utils';
import { AthletesService } from 'src/app/services/athletes.service';
import { SummaryAthlete, SummaryAthleteClass } from 'src/app/interfacesStrava/models';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy{

  // valeur de connexion
  isConnected : boolean = false;
  userConnected: SummaryAthlete = new SummaryAthleteClass();

  constructor(
    private oauthService  : Oauth2Service,
    private athleteService: AthletesService,
  ) 
  {}

  ngOnInit(){

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

  ngOnDestroy(){
    this.oauthService.isConnectedSubject.unsubscribe();
  }
}

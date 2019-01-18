import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Configuration } from '../../classes/configStrava';
import { Oauth2Service } from '../../services/oauth2.service';
import { Constants } from '../../configuration/constants'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  // formAuth: FormGroup;
  config  : Configuration;

  constructor(
    private oauthService : Oauth2Service,
    // private formBuilder: FormBuilder,
    private route      : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {

    this.oauthService.isConnectedSubject.subscribe(p_isConnected=>{
      if (p_isConnected){
        this.router.navigate(['/dashboard'])
      }
    })
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
  }
}

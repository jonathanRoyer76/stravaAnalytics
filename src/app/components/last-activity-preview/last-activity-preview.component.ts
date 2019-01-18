import { Component, OnInit } from '@angular/core';
import { AthletesService } from 'src/app/services/athletes.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import * as L from 'leaflet'
import * as Polyline from 'polyline'
import { lastActivityClass, lastActivityInterface } from 'src/app/classes/lastActivityPreview';
import { Constants } from 'src/app/configuration/constants';

@Component({
  selector: 'app-last-activity-preview',
  templateUrl: './last-activity-preview.component.html',
  styleUrls: ['./last-activity-preview.component.scss']
})
export class LastActivityPreviewComponent implements OnInit {

  // La dernière activité recensée
  lastActivity: lastActivityInterface = new lastActivityClass();
  athlete = {
    id       : 0,
    firstName: "",
    lastName : "",       
    email    : "",
    avatarURL: ""
}

  constructor(
    private athleteService : AthletesService,
    private activitiesServices: ActivitiesService
  ) { }

  ngOnInit() {
    this.athleteService.getLoggedInAthlete().subscribe(p_athlete=>{
      if (p_athlete){
        this.athlete.id        = p_athlete.id;
        this.athlete.firstName = p_athlete.firstname;
        this.athlete.lastName  = p_athlete.lastname;
        this.athlete.email     = p_athlete['email'];
        this.athlete.avatarURL = p_athlete.profile_medium;
      }
    })
    this.activitiesServices.getLastActivity().subscribe(p_activity=>{
      if (p_activity){
        this.lastActivity = p_activity;
        let map = L.map('map').setView([this.lastActivity.startLongitude[0], this.lastActivity.startLongitude[1]], 13)
        L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 25,
          }).addTo(map);
        let coords = Polyline.decode(this.lastActivity.map.summary_polyline)
        L.polyline(coords, { color: Constants.couleurs.violet, lineJoin: 'round' }).addTo(map);
      }    
    })
  }

}

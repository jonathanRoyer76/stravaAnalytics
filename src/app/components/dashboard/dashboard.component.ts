import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { UtilsMethods } from 'src/app/configuration/utils';
import { AnnualStatsInterface, AnnualStatsClass } from 'src/app/classes/annualStats';
import { Chart } from 'chart.js';
import { Constants } from 'src/app/configuration/constants';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tendance } from 'src/app/classes/tendance';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  // Pour les graphs
  colspanGraphs          = Constants.colspanLandscapeGraphs;
  rowspanGraphs          = Constants.rowspanLandscapeGraphs;
  colspanSynthese        = Constants.rowspanLandscapeGraphs;
  rowspanSynthese        = Constants.rowspanLandscapeGraphs;
  colspanSmall           = Constants.rowspanLandscapeSmall;
  rowspanSmall           = Constants.rowspanLandscapeSmall;
  colspanActivityPreview = Constants.rowspanLandscapeSmall;
  rowspanActivityPreview = Constants.rowspanLandscapeSmall;
  ratio                  = Constants.ratioLandscape;
  colsCount              = Constants.colCountLandscape;
  
  tendance : tendance = new tendance(); 

  isGraphsShowable : boolean = true;
  // Surveille la résolution de l'écran pour le web paysage
  isWebLandscape: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.WebLandscape)
    .pipe(
      map(result => result.matches)
    )
  // Surveille la résolution de l'écran pour le web portrait
  isWebPortrait: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.WebPortrait)
    .pipe(
      map(result => result.matches)
    )
  // Surveille la résolution de l'écran pour le mobile portrait
  isHandsetPortrait: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
  .pipe(
    map(result => result.matches)
  )
  // Surveille la résolution de l'écran pour le mobile paysage
  isHandsetLandscape: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetLandscape)
  .pipe(
    map(result => result.matches)
  )

  // Tableaux contenant les activités
  activitiesListPastYear  : AnnualStatsInterface;  
  activitiesListAcutalYear: AnnualStatsInterface;
  // Objet javasript pour les charts
  graphN1 = []
  graphN  = []
  // Objets Stats
  actualYearStats: AnnualStatsInterface = new AnnualStatsClass();
  lastYearStats  : AnnualStatsInterface = new AnnualStatsClass();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activitiesService : ActivitiesService
  ){}

  ngOnInit(){
    // Pour le paysage web
    this.isWebLandscape.subscribe(p_boo=>{
      if (p_boo){
        if (!this.isGraphsShowable){
          
          this.isGraphsShowable = true;          
        }
        this.colspanGraphs          = Constants.colspanLandscapeGraphs;
        this.rowspanGraphs          = Constants.rowspanLandscapeGraphs;
        this.rowspanSynthese        = Constants.rowspanLandscapeSynthese;
        this.colspanSynthese        = Constants.colspanLandscapeSynthese;
        this.rowspanSmall           = Constants.rowspanLandscapeSmall;
        this.colspanSmall           = Constants.colspanLandscapeSmall;
        this.ratio                  = Constants.ratioLandscape;
        this.colsCount              = Constants.colCountLandscape;
        this.rowspanActivityPreview = Constants.rowspanLandscapeActivityPreview;
        this.colspanActivityPreview = Constants.colspanLandscapeActivityPreview;
      }      
    })  
    // Pour le portrait web
    this.isWebPortrait.subscribe(p_boo=>{
      if (p_boo){
        this.isGraphsShowable = true;
        this.colspanGraphs          = Constants.colspanPortraitGraphs;
        this.rowspanGraphs          = Constants.rowspanPortraitGraphs;
        this.rowspanSynthese        = Constants.rowspanPortraitSynthese;
        this.colspanSynthese        = Constants.colspanPortraitSynthese;
        this.rowspanSmall           = Constants.rowspanPortraitSmall;
        this.colspanSmall           = Constants.colspanPortraitSmall;
        this.ratio                  = Constants.ratioPortrait;
        this.colsCount              = Constants.colCountPortrait;
        this.rowspanActivityPreview = Constants.rowspanPortraitActivityPreview;
        this.colspanActivityPreview = Constants.colspanPortraitActivityPreview;
      }      
    })  
    // Pour le paysage mobile
    this.isHandsetLandscape.subscribe(p_boo=>{
      if (p_boo){
        this.isGraphsShowable = true;
        this.colspanGraphs          = Constants.handsetColspanLandscapeGraphs;
        this.rowspanGraphs          = Constants.handsetRowspanLandscapeGraphs;
        this.rowspanSynthese        = Constants.handsetRowspanLandscapeSynthese;
        this.colspanSynthese        = Constants.handsetColspanLandscapeSynthese;
        this.rowspanSmall           = Constants.handsetRowspanLandscapeSmall;
        this.colspanSmall           = Constants.handsetColspanLandscapeSmall;
        this.ratio                  = Constants.handsetRatioLandscape;
        this.colsCount              = Constants.handsetColCountLandscape;
        this.rowspanActivityPreview = Constants.handsetRowspanLandscapeActivityPreview;
        this.colspanActivityPreview = Constants.handsetColspanLandscapeActivityPreview;
      }      
    })  
    // Pour le portrait mobile
    this.isHandsetPortrait.subscribe(p_boo=>{
      if (p_boo){
        this.isGraphsShowable = false;
        this.colspanGraphs          = Constants.handsetColspanPortraitGraphs;
        this.rowspanGraphs          = Constants.handsetRowspanPortraitGraphs;
        this.rowspanSynthese        = Constants.handsetRowspanPortraitSynthese;
        this.colspanSynthese        = Constants.handsetColspanPortraitSynthese;
        this.rowspanSmall           = Constants.handsetRowspanPortraitSmall;
        this.colspanSmall           = Constants.handsetColspanPortraitSmall;
        this.ratio                  = Constants.handsetRatioPortrait;
        this.colsCount              = Constants.handsetColCountPortrait;
        this.rowspanActivityPreview = Constants.handsetRowspanPortraitActivityPreview;
        this.colspanActivityPreview = Constants.handsetColspanPortraitActivityPreview;
      }      
    })  
    // Pour surveiller et obtenir les infos de la tendance de l'année
    UtilsMethods.tendanceSubject.subscribe(p_tendance=>{
      if (p_tendance){
        this.tendance = p_tendance;           
      }
    })   
    this.getActivitiesListPastYear();
    this.getActivitiesListActualYear();      
  }

  // Récupère les stats de l'année passée
  getActivitiesListActualYear(){
    // Définit les périodes de début et de fin
    let tempDate : Date = new Date();
    let startPeriod = parseInt((Date.now()/1000).toString());
    let endPeriod = Date.parse(tempDate.getFullYear()-1+'-12-31T00:00:00')/1000;
    // Récupère la liste des activités de N
    this.activitiesService.getPeriodActivitiesList(startPeriod, endPeriod).subscribe(data=>{
      // Affectation dans la variable du component et création des graphs
      this.activitiesListAcutalYear = UtilsMethods.getYearStatsByMonth(data)
      this.createGraphicActualYear();  
      this.createGraphicDistanceActualYear();

      // récupère les infos de l'année
      let yearActivities = new Array();
      data.forEach(p_activity=>{
        yearActivities.push(p_activity);
      })
      this.actualYearStats= UtilsMethods.getYearStats(yearActivities);
      UtilsMethods.getYearTendance(this.lastYearStats, this.actualYearStats);
    })  
  }

  // Récupère les stats de l'année passée
  getActivitiesListPastYear(){
    // Définit les périodes de début et de fin
    let startPeriod = Date.parse(new Date(Date.now()).getFullYear()-1+'-12-31T00:00:00')/1000; 
    let endPeriod = Date.parse(new Date(Date.now()).getFullYear()-1+'-01-01T00:00:00')/1000; 
    // Récupère la liste des activités de N-1
    this.activitiesService.getPeriodActivitiesList(startPeriod, endPeriod).subscribe(data=>{
      // Affectation dans la variable du component et création des graphs
      this.activitiesListPastYear = UtilsMethods.getYearStatsByMonth(data)
      this.createGraphicsLastYear();  
      this.createGraphicDistanceLastYear(); 
      
      // récupère les infos de l'année
      let yearActivities = new Array();
      data.forEach(p_activity=>{
        yearActivities.push(p_activity);
      })
      this.lastYearStats= UtilsMethods.getYearStats(yearActivities);
      UtilsMethods.getYearTendance(this.lastYearStats, this.actualYearStats);
    })  
  }

  // Créee les graphs à afficher pour l'année en cours
  createGraphicActualYear(){
    if (this.activitiesListAcutalYear){
      this.graphN = new Chart(`chartN`, { 
        type: 'line',        
        data: {
          labels: Constants.monthsOfYear,
          datasets: [{
            label: `Nombre de runs`,
            fill: 'false',
            data: this.activitiesListAcutalYear.totalRuns,
            backgroundColor: Constants.couleurs.rouge,
            borderColor: Constants.couleursBordures.rouge,
            borderWidth: 2
          },{
            label: `Allure moyenne en min/km`,
            fill: 'false',
            data: this.activitiesListAcutalYear.averageSpeed,
            backgroundColor: Constants.couleurs.violet,
            borderColor: Constants.couleursBordures.violet,
            borderWidth: 2
          },{
            label: `Temps de course total en heures`,
            fill: 'false',
            data: this.activitiesListAcutalYear.totalTime,
            backgroundColor: Constants.couleurs.vert,
            borderColor: Constants.couleursBordures.vert,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: true
					}
        }
      })
    }else{
      console.error(`Le tableau du graph de l'année passée est vide`)
    }
  }

  // Créee les graphs à afficher pour N-1
  createGraphicsLastYear(){
    if (this.activitiesListPastYear){
      this.graphN1 = new Chart(`chartN-1`, { 
        type: 'line',        
        data: {
          labels: Constants.monthsOfYear,
          datasets: [
          {
            label: `Nombre de runs`,
            fill: 'false',
            data: this.activitiesListPastYear.totalRuns,
            backgroundColor: Constants.couleurs.orange,
            borderColor: Constants.couleursBordures.orange,
            borderWidth: 2
          },{
            label: `Allure moyenne en min/km`,
            fill: 'false',
            data: this.activitiesListPastYear.averageSpeed,
            backgroundColor: Constants.couleurs.vert,
            borderColor: Constants.couleursBordures.vert,
            borderWidth: 2
          },{
            label: `Temps de course total en heures`,
            fill: 'false',
            data: this.activitiesListPastYear.totalTime,
            backgroundColor: Constants.couleurs.rouge,
            borderColor: Constants.couleursBordures.rouge,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: true
					}
        }
      })
    }else{
      console.error(`Le tableau du graph de l'année passée est vide`)
    }
  }

  // Créee les graphs à afficher pour N-1
  createGraphicDistanceLastYear(){
    if (this.activitiesListPastYear){
      this.graphN1 = new Chart(`distanceN-1`, { 
        type: 'line',     
        data: {
          labels: Constants.monthsOfYear,
          datasets: [{
            label: `Distance parcourue en KM`,    
            fill: 'origin',        
            data: this.activitiesListPastYear.totalDistance,
            backgroundColor: Constants.couleurs.violet,
            borderColor: Constants.couleursBordures.violet,
            borderWidth: 2       
          }]
        }
      })
    }else{
      console.error(`Le tableau du graph de l'année passée est vide`)
    }
  } 

  // Créee les graphs à afficher pour N-1
  createGraphicDistanceActualYear(){
    if (this.activitiesListAcutalYear){
      this.graphN1 = new Chart(`distanceN`, { 
        type: 'line',     
        data: {
          labels: Constants.monthsOfYear,
          datasets: [{
            label: `Distance parcourue en KM`,    
            fill: 'origin',        
            data: this.activitiesListAcutalYear.totalDistance,
            backgroundColor: Constants.couleurs.bleu,
            borderColor: Constants.couleursBordures.bleu,
            borderWidth: 2,            
          }]
        }
      })
    }else{
      console.error(`Le tableau du graph de l'année passée est vide`)
    }
  }
}
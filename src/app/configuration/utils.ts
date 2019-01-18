import { SummaryActivity } from '../interfacesStrava/models';
import { AnnualStatsClass, AnnualStatsInterface } from '../classes/annualStats'
import { TimeMethods } from './timeMethods'
import { BehaviorSubject } from 'rxjs';
import { tendance } from '../classes/tendance';

export class UtilsMethods{

  // Contient la tendance annuelle
  public static tendanceSubject : BehaviorSubject<tendance> = new BehaviorSubject<tendance>(new tendance());

  // Détermine si le token est expiré ou pas
  static isAccessTokenExpired(p_expiration: number):boolean{
    
    if (p_expiration <0) return true;
    if (p_expiration){
      let expirationDate = this.getTokenExpirationTime(p_expiration);
      let actualDate = new Date(Date.now());
      return (actualDate>expirationDate)
    }
  }

  // Retourne la date et heure d'expiration du token sous forme de date
  static getTokenExpirationTime(p_expiration: number):Date{
    if (p_expiration <0) return null;
    // Définit la date au 1er janvier 1970
    let dateTemp = new Date(0);
    dateTemp.setUTCSeconds(p_expiration);
    return dateTemp;
  }

  // Obtient les statistiques pour l'année passée classé par mois
  static getYearStatsByMonth(p_summaryActivities : SummaryActivity[]):AnnualStatsClass{
    
    let yearStats = new AnnualStatsClass();

    if (p_summaryActivities){
      let sortedArray = this.getMonthlySortedActivitiesArray(p_summaryActivities)

      // Pour chaque mois, récupère les totaux/moyennes correspondants
      sortedArray.forEach(monthArray=>{
        yearStats.totalDistance.push(this.getTotalDistanceMonth(monthArray))
        yearStats.totalRuns.push(this.getTotalRuns(monthArray));
        yearStats.totalTime.push(this.getTotalTime(monthArray));
        yearStats.totalSeconds.push(this.getTotalSeconds(monthArray));
        yearStats.averageSpeed.push(this.getAverageSpeed(monthArray));
      })

    }else{
      console.error(`tableau des activités non reçu.`)
    }

    return yearStats;
  }

  // Obtient les statistiques pour l'année passée
  static getYearStats(p_activitiesList : SummaryActivity[]):AnnualStatsClass{
    
    let yearStats = new AnnualStatsClass();

    if (p_activitiesList){
        yearStats.totalDistance.push(this.getTotalDistanceMonth(p_activitiesList))
        yearStats.totalRuns.push(this.getTotalRuns(p_activitiesList));
        yearStats.totalTime.push(this.getTotalTime(p_activitiesList));
        yearStats.totalSeconds.push(this.getTotalSeconds(p_activitiesList));
        yearStats.totalMeters.push(this.getTotalMeters(p_activitiesList));
        yearStats.averageSpeed.push(this.getAverageSpeed(p_activitiesList));
        yearStats = this.getYearStatsByActivity(yearStats);
    }else{
      console.error(`tableau des activités non reçu.`)
    }

    return yearStats;
  }

  //Converti les min/km en km/h
  static getKmByHourFromSeconds(p_seconds: number, p_totalDistance):number{

    if (p_seconds){
      if (p_totalDistance){
        let returnValue = ((3600*p_totalDistance)/p_seconds)/1000;
        return parseFloat(returnValue.toFixed(3));
      }else{
        console.error('Le nombre de kilomètres est manquant');
      }
    }else{
      console.error('La valeur des secondes est manquante');
    }
  }

  // Obtient les moyennes statistiques pour l'année passée par activité
  static getYearStatsByActivity(p_activitiesArray : AnnualStatsClass):AnnualStatsClass{
    
    if (p_activitiesArray){
      p_activitiesArray.totalRuns.push(p_activitiesArray.totalRuns[0]);
      p_activitiesArray.totalSeconds.push(p_activitiesArray.totalSeconds[0]);
      p_activitiesArray.totalMeters.push(p_activitiesArray.totalMeters[0]);
      p_activitiesArray.totalDistance.push(parseFloat((p_activitiesArray.totalDistance[0]/p_activitiesArray.totalRuns[0]).toFixed(3)));
      // Nombre de secondes moyenne par activité et conversion en minutes
      let timeAverage = p_activitiesArray.totalSeconds[0]/p_activitiesArray.totalRuns[0];
      p_activitiesArray.totalTime.push(TimeMethods.convertSecondsInMinutes(timeAverage));
      p_activitiesArray.averageSpeed.push(this.getKmByHourFromSeconds(p_activitiesArray.totalSeconds[1], p_activitiesArray.totalMeters[1]))
    }else{
      console.error(`tableau des activités non reçu.`)
    }

    return p_activitiesArray;
  }

  // Renvoi une moyenne d'heures converti en minutes
  static getAnnualTimeAverage(p_cumulActivities: AnnualStatsInterface): AnnualStatsInterface{

    if (p_cumulActivities){
      
    }

    return p_cumulActivities;
  }

  // Renvoie l'allure moyenne sur une période en min/km en fonction des paramètres
  static getAverageSpeedFromValues(p_distance: number, p_seconds: number): number{
    
    let returnValue=0;
    
    if (p_distance){
      if (p_seconds){
          // Pour avoir le nombre de seconds correspondant à la moyenne
          let secondsAverage = p_seconds/p_distance
          returnValue = TimeMethods.convertSecondsInMinutes(secondsAverage);  
      }else{
        console.log(`Durée absente`);
      }
    }else{
      console.error(`Distance absente`)
    }

    return returnValue;
  }

  // Renvoie l'allure moyenne sur une période en min/km
  static getAverageSpeed(p_activities: SummaryActivity[]):number{
    // Variables nécessaires
    let returnValue=0;
    
    if (p_activities){
      let totalDistance = this.getTotalDistanceMonth(p_activities);
      let totalSeconds = this.getTotalSeconds(p_activities);
      if (totalDistance && totalSeconds){
        // Pour avoir le nombre de seconds correspondant à la moyenne
        let secondsAverage = parseInt((totalSeconds/totalDistance).toString());
        returnValue = TimeMethods.convertSecondsInMinutes(secondsAverage);
      }else{
        if (totalDistance){
          console.error(`Distance de parcours total non récupéré`)
        }else{
          if (totalSeconds){
            console.error(`Temps de parcours non récupéré`)
          }
        }
      }
    }else{
      console.error(`Pas de données en paramètres.`)
    }

    return returnValue;
  }

  // Renvoie le temps total couru en heures et % d'heure : 1.65h = 1h et 65% de 1h
  static getTotalTime(p_activities: SummaryActivity[]):number{
    let returnValue = 0;

    if (p_activities){
      let seconds = this.getTotalSeconds(p_activities);
      if (seconds){
        returnValue = TimeMethods.convertSecondsInHours(seconds);
      }
    }
    
    return returnValue;
  }

  // Retourne le nombre total de mètres sur la période
  static getTotalMeters(p_activities: SummaryActivity[]):number{
    let returnValue =0;

    p_activities.forEach(activity=>{
      returnValue += activity.distance;
    })
    
    return returnValue;
  }

  // Retourne le nombre total de secondes sur la période
  static getTotalSeconds(p_activities: SummaryActivity[]):number{
    let returnValue =0;

    p_activities.forEach(activity=>{
      returnValue += activity.moving_time;
    })
    
    return returnValue;
  }

  // Renvoie le nombre total de courses dans l'année
  static getTotalRuns(p_activities: SummaryActivity[]):number{
    let returnValue = 0;

    p_activities.forEach(activity=>{
      returnValue += 1;
    })

    return returnValue;
  }

  // Calcul la distance totale et la convertit en kilomètre
  static getTotalDistanceMonth(p_activities: SummaryActivity[]):number{
    let returnValue;

    if(p_activities){
      // Calcul le total
      returnValue=0;
      p_activities.forEach(activity=>{
        returnValue += activity.distance;        
      })
      returnValue = parseFloat((returnValue / 1000).toFixed(3));
    }

    return returnValue;
  }

  // Trie le tableau des activités par mois
  static getMonthlySortedActivitiesArray(p_summaryActivities : SummaryActivity[]):Array<Array<SummaryActivity>>{
    // Création des tableaux
    let sortedArray = new Array();
    for (let i=0; i<12; i++) sortedArray[i]=new Array()

    // Répartition des activités
    p_summaryActivities.forEach(p_activity=>{
      let dateTemp : Date = new Date(p_activity.start_date_local); 
      let i = dateTemp.getMonth();
      sortedArray[i].push(p_activity);
    })

    return sortedArray;
  }

  // Retourne la tendance de l'année
  static getYearTendance(p_valN1: AnnualStatsInterface, p_valN: AnnualStatsInterface){
      let returnValue = new tendance();
      if (p_valN1){
        if (p_valN1){
          returnValue.distance = this.getDistanceDifference(p_valN1.totalDistance[1], p_valN.totalDistance[1])
          returnValue.averageSpeed = this.getAverageSpeedDifference(p_valN1.averageSpeed[0], p_valN.averageSpeed[0])
          returnValue.time = this.getTimeDifference(p_valN1.totalTime[0], p_valN.totalTime[0])
          this.tendanceSubject.next(returnValue);
        }
      } 
  }

  // Retourne la différence entre 2 valeurs de temps pour la tendance annuelle
  static getTimeDifference(p_valN1: number, p_valN: number): number{
    if (p_valN1){
      if (p_valN){
        return parseFloat((p_valN1-p_valN).toFixed(2));
      }
    }
}

  // Retourne la différence entre 2 valeurs de distance pour la tendance annuelle
  static getDistanceDifference(p_valN1: number, p_valN: number): number{
      if (p_valN1){
        if (p_valN){
          /**
           * Convertir les % de secondes en secondes
           */
          return parseFloat((p_valN-p_valN1).toFixed(3));
        }
      }
  }

  // Retourne la différence entre 2 valeurs d'allure pour la tendance annuelle
  static getAverageSpeedDifference(p_valN1: number, p_valN: number): number{
      if (p_valN1){
        if (p_valN){
          return parseFloat((p_valN-p_valN1).toFixed(2));
        }
      }
  }
}

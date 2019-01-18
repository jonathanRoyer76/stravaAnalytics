import { PolylineMap, DetailedAthlete } from '../interfacesStrava/models';

export interface lastActivityInterface{
    activityId    : number
    activityName  : string
    startDate     : Date
    map           : PolylineMap
    duration      : number       // temps de la course en secondes
    averageSpeed  : number       // allure, en min/km
    distance      : number       // distance en metres
    calories      : number       // Calories brulées durant l'activité
    startLongitude: number[]
}

export class lastActivityClass{
    activityId    : number
    activityName  : string
    startDate     : Date
    map           : PolylineMap
    duration      : number       // temps de la course en secondes
    averageSpeed  : number       // allure, en min/km
    distance      : number       // distance en metres
    calories      : number       // Calories brulées durant l'activité
    startLongitude: number[] = []
}
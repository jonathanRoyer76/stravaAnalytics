// Interface correspondante
export interface AnnualStatsInterface {
    totalDistance: number[]      // Distance totale en kilomètres
    totalTime    : number[]      // Temps total couru
    totalRuns    : number[]      // Nombre de courses
    averageSpeed : number[]      // Vitesse moyenne
    totalSeconds : number[]      // Nombre total de secondes
    totalMeters  : number[]      // Nombre total de mètres
}

// Classe représentant les statistiques annuelles
export class AnnualStatsClass {
    totalDistance: number[]      // Distance totale en kilomètres
    totalTime    : number[]        // Temps total couru
    totalRuns    : number[]      // Nombre de courses
    averageSpeed : number[]      // Vitesse moyenne
    totalSeconds : number[]      // Nombre total de secondes
    totalMeters  : number[]      // Nombre total de mètres

    constructor(){
        this.totalDistance = [];
        this.totalTime     = [];
        this.totalRuns     = [];
        this.averageSpeed  = [];
        this.totalSeconds  = [];
        this.totalMeters  = [];
    }
}
export interface tendance{
    time    : number
    distance: number
    averageSpeed : number
}

export class tendance{
    time    : number
    distance: number
    averageSpeed : number

    constructor(){
        this.time         = 0;
        this.distance     = 0;
        this.averageSpeed = 0;
    }
}
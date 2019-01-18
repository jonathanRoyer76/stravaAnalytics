export class TimeMethods{

    // Converti des secondes en heures
    static convertSecondsInHours(p_value: number):number{
        if (p_value){
            let returnValue;
            let hoursCount = parseInt((p_value/3600).toString());         
            let minutesCount = (p_value/3600) - (Math.floor((p_value/3600)))
            minutesCount = parseInt((minutesCount*60).toString())/100;
            returnValue = hoursCount + minutesCount;
            
            return returnValue;
        }else{
            console.error(`Valeur absente`)
        }
    }

    // Converti des secondes en minutes
    static convertSecondsInMinutes(p_value: number):number{
        if (p_value){
            let returnValue;
            let minutesCount = parseInt((p_value/60).toString());         
            let secondsCount = (p_value/60) - (Math.floor((p_value/60)))
            secondsCount = parseInt((secondsCount*60).toString())/100;
            returnValue = minutesCount + secondsCount;
            
            return returnValue;
        }
    }

    // Renvoie le nombre de minutes contenues dans la valeur en secondes
    static getMinutesInSeconds(p_value: number):number{

        if (p_value){
            return parseInt((p_value/60).toString()) 
        }else{
            console.error(`Pas de valeur en paramètre`)
        }
    }

    // Renvoie le nombre d'heures contenues dans la valeur en secondes
    static getHoursInSeconds(p_value: number):number{

        if (p_value){
            return parseInt((p_value/3600).toString())
        }else{
            console.error(`Pas de valeur en paramètre`)
        }
    }

    // Renvoie le nombre de secondes contenues dans la valeur en secondes
    static getSecondsInSeconds(p_value: number):number{

        if (p_value){
            let minutesCount = p_value/60;  // Pour avoir le nombre de minutes
            let temp = minutesCount - Math.floor(minutesCount); // Pour avoir seulement les décimales
            temp = parseInt((temp*100).toString())  // Pour avoir les 2 premiers chiffres après la virgule
            temp = temp / 100;  // Tansforme en entier
            temp = temp*60; // Converti en secondes
            return parseInt(temp.toString());
        }else{
            console.error(`Pas de valeur en paramètre`)
        }
    }
}
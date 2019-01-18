export class UrlsStrava{

    // URL de base
    public static BASE_URL : string = `https://www.strava.com/`
    // Complément pour la connexion
    public static BASE_OAUTH : string = UrlsStrava.BASE_URL+`oauth/`
    // Complément pour l'API
    public static BASE_API : string = UrlsStrava.BASE_URL+`api/v3/`
    
    /**
     * URLs de connexion/déconnexion
     */
    // URL de connexion strava pour obtenir les droits d'accès à l'application
    public static URL_AUTHORIZE  : string = UrlsStrava.BASE_OAUTH+`authorize`
    // URL d'obtention de token
    public static URL_TOKEN      : string = UrlsStrava.BASE_OAUTH+`token`;
    // URL de connexion strava pour déconnecter l'application
    public static URL_DEAUTHORIZE: string = UrlsStrava.BASE_OAUTH+`deauthorize` 

    /**
     * URLs Athletes
     */
    // URL pour obtenir les infos de l'athlète associé au compte
    public static URL_LOGGED_ATHLETE    : string = UrlsStrava.BASE_API+`athlete`;


    /**
     * URLs Activités
     */
    // URL pour obtenir la liste des activités du compte
    public static URL_ACTIVITIES_LIST    : string = UrlsStrava.BASE_API+`athlete/activities`;
    // URL pour obtenir une activité dont on connait l'ID
    public static URL_ACTIVITY    : string = UrlsStrava.BASE_API+`activities/`;
}
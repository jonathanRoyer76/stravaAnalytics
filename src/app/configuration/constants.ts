export class Constants {

    /**
     * Valeurs par défaut pour les besoins d'authentifications
     */
    public static REDIRECT_URI_DEFAULT         : string = 'http://jonathanRoyer76.github.io/stravaAnalytics/authentification';
    public static RESPONSE_TYPE_DEFAULT        : string = 'code';
    public static GRANT_TYPE_FIRST_CODE_DEFAULT: string = 'authorization_code';
    public static APPROVAL_PROMPT_DEFAULT      : string = 'force';
    public static SCOPE_DEFAULT                : string = 'profile:read_all,profile:write,activity:read_all,activity:write'; 
    public static CLIENT_ID_DEFAULT            : number = 30076; 
    public static CLIENT_SECRET_DEFAULT        : string = '9dd09e3d2d56c0cc7a7dc8554dd2f2a2d351a34f';

    /**
     * noms des params dans les requètes URL 
     */
    public static CLIENT_ID_PARAM       : string = 'client_id';
    public static CLIENT_SECRET_PARAM   : string = 'client_secret'; 
    public static CLIENT_CODE_PARAM     : string = 'code';
    public static REDIRECT_URI_PARAM    : string = 'redirect_uri';
    public static RESPONSE_TYPE_PARAM   : string = 'response_type';
    public static APPROVAL_PROMPT_PARAM : string = 'approval_prompt';
    public static SCOPE_PARAM           : string = 'scope';
    public static GRANT_TYPE_PARAM      : string = 'grant_type';

    /**
     * Cookies
     */
    // Client ID
    public static CLIENT_ID_COOKIE    : string = "client_id_strava"
    // client secret
    public static CLIENT_SECRET_COOKIE: string = "client_secret_strava"
    // Nom du access token
    public static ACCESS_TOKEN_COOKIE : string = "access_token_strava";
    // Nom du refresh Token
    public static REFRESH_TOKEN_COOKIE: string = "refresh_token_strava";
    // Nom du refresh Token
    public static CODE_COOKIE         : string = "code_strava";
    // Nom du refresh Token
    public static EXPIRES_AT_COOKIE   : string = "expires_at_strava";

    /**
     * Pour les échanges avec Strava
     */
    // A compléter avec le token
    public static BASE_TOKEN          : string = `Bearer `;
    // Nom du header à placer dans les requètes
    public static HEADER_AUTHORIZATION: string = `Authorization`;

    /**
     * Divers
     */
    // Définition des couleurs
    public static couleurs = {
        rouge: 'rgba(255, 99, 132, 0.5)',
        orange: 'rgba(255, 159, 64, 0.5)',
        jaune: 'rgba(255, 205, 86, 0.5)',
        vert: 'rgba(75, 192, 192, 0.5)',
        bleu: 'rgba(54, 162, 235, 0.5)',
        violet: 'rgba(153, 102, 255, 0.5)',
        gris: 'rgba(201, 203, 207, 0.5)'
    };
    // Définition des couleurs des bordures
    public static couleursBordures = {
        rouge: 'rgba(255, 99, 132, 1)',
        orange: 'rgba(255, 159, 64, 1)',
        jaune: 'rgba(255, 205, 86, 1)',
        vert: 'rgba(75, 192, 192, 1)',
        bleu: 'rgba(54, 162, 235, 1)',
        violet: 'rgba(153, 102, 255, 1)',
        gris: 'rgba(201, 203, 207, 1)'
    };

    // Définitions des mois de l'année
    public static monthsOfYear = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Aout',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
    ]

    // Pour l'affichage en mode paysage
    public static colspanLandscapeGraphs = 2;
    public static rowspanLandscapeGraphs = 2;
    public static colspanLandscapeSynthese = 2;
    public static rowspanLandscapeSynthese = 2;
    public static colspanLandscapeSmall = 2;
    public static rowspanLandscapeSmall = 2;
    public static colspanLandscapeActivityPreview = 3;
    public static rowspanLandscapeActivityPreview = 2;
    public static ratioLandscape = '1.75:1';
    public static colCountLandscape = 5;
    // Pour l'affichage en mode portait
    public static colspanPortraitGraphs = 4;
    public static rowspanPortraitGraphs = 4;
    public static colspanPortraitSynthese = 2;
    public static rowspanPortraitSynthese = 2;
    public static colspanPortraitSmall = 3;
    public static rowspanPortraitSmall = 2;
    public static colspanPortraitActivityPreview = 3;
    public static rowspanPortraitActivityPreview = 2;
    public static ratioPortrait = '1.55:1';
    public static colCountPortrait = 4;
}

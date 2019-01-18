import { Constants } from '../configuration/constants'
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface ConfigurationParameters {
    apiKeys?        : {[ key       :  string ]: string};
    username?       : string;
    client_id?      : number;
    client_secret?  : string;
    redirect_uri?   : string;
    response_type?  : string;
    approval_prompt?: string;
    scope?          : string;
    code?           : string;
    grant_type?     : string;
    refresh_token?  : string;
    password?       : string;
    accessToken?    : string | (() => string);
    basePath?       : string;
    withCredentials?: boolean;
    expires_at?     : number;
}

@Injectable({
    providedIn: 'root'
})
export class Configuration {
    apiKeys?        : {[ key       :  string ]: string};
    username?       : string;
    client_id?      : number;
    client_secret?  : string;
    redirect_uri?   : string;
    response_type?  : string;
    approval_prompt?: string;
    scope?          : string;
    code?           : string;
    grant_type?     : string;
    refresh_token?  : string;
    password?       : string;
    accessToken?    : string | (() => string);
    basePath?       : string;
    withCredentials?: boolean;
    expires_at?     : number;

    constructor(
        // configurationParameters: ConfigurationParameters = {}
    ){        
        // this.apiKeys = configurationParameters.apiKeys;
        // this.username = configurationParameters.username;
        // this.password = configurationParameters.password;
        // this.accessToken = configurationParameters.accessToken;
        // this.basePath = configurationParameters.basePath;
        // this.withCredentials = configurationParameters.withCredentials;
        this.loadConfigFromLocalStorage();
        this.initDefaultValues();
    }

    /**
     * Select the correct content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {string[]} contentTypes - the array of content types that are available for selection
     * @returns {string} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    public selectHeaderContentType (contentTypes: string[]): string | undefined {
        if (contentTypes.length == 0) {
            return undefined;
        }

        let type = contentTypes.find(x => this.isJsonMime(x));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    }

    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {string[]} accepts - the array of content types that are available for selection.
     * @returns {string} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    public selectHeaderAccept(accepts: string[]): string | undefined {
        if (accepts.length == 0) {
            return undefined;
        }

        let type = accepts.find(x => this.isJsonMime(x));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    }

    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param {string} mime - MIME (Multipurpose Internet Mail Extensions)
     * @return {boolean} True if the given MIME is JSON, false otherwise.
     */
    public isJsonMime(mime: string): boolean {
        const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }

    // Sauvegarde les informations vitales de la config dans les cookies
    saveConfigToLocalStorage(){
        this.saveAccessTokenToLocalStorage();
        // this.saveClientIdToLocalStorage();
        // this.saveClientSecretToLocalStorage();
        this.saveRefreshTokenToLocalStorage();
        // this.saveCodeToLocalStorage();
        this.saveExpiresAtToLocalStorage();
    }

    // Charge les informations de la config depuis les cookies
    loadConfigFromLocalStorage(): Observable<boolean>{
        this.loadAccessTokenFromLocalStorage();
        // this.loadClientIdFromLocalStorage();
        // this.loadClientSecretFromLocalStorage();
        this.loadRefreshTokenFromLocalStorage();
        // this.loadCodeFromLocalStorage();
        this.loadExpiresAtFromLocalStorage();
        return new Observable<boolean>(observer=>{
            observer.next(true);
        })
    }

    // Affecte des valeurs par défaut à la configuration
    initDefaultValues(){
        // Adresse de redirection
        if (!this.redirect_uri){
            this.redirect_uri = Constants.REDIRECT_URI_DEFAULT;
        }
        // ID client
        if (!this.client_id){
            this.client_id = Constants.CLIENT_ID_DEFAULT;
        }
        // response_type
        if (!this.response_type){
            this.response_type = Constants.RESPONSE_TYPE_DEFAULT;
        }
        // apporval_prompt
        if (!this.approval_prompt){
            this.approval_prompt = Constants.APPROVAL_PROMPT_DEFAULT;
        }
        // scope
        if (!this.scope){
            this.scope = Constants.SCOPE_DEFAULT;
        }
        // client secret
        if (!this.client_secret){
            this.client_secret = Constants.CLIENT_SECRET_DEFAULT;
        }
    }

    // // Enregistre le client_id dans le local storage
    // saveClientIdToLocalStorage(p_value?: number){
    //     if (p_value){
    //         localStorage.setItem(Constants.CLIENT_ID_COOKIE, p_value.toString());
    //         this.client_id = p_value;
    //     }
    //     else{
    //         if (this.client_id) 
    //             localStorage.setItem(Constants.CLIENT_ID_COOKIE, this.client_id.toString());
    //     }
    // }

    // // charge le client_id depuis le local storage
    // loadClientIdFromLocalStorage(){
    //     let tempValue = localStorage.getItem(Constants.CLIENT_ID_COOKIE);
    //     if (tempValue)
    //         this.client_id = +tempValue;
    // }

    // // Enregistre le client_secret dans le local storage
    // saveClientSecretToLocalStorage(p_value?: string){
    //     if (p_value){
    //         localStorage.setItem(Constants.CLIENT_SECRET_COOKIE, p_value);
    //         this.client_secret = p_value;
    //     }
    //     else{
    //         if (this.client_secret) 
    //             localStorage.setItem(Constants.CLIENT_SECRET_COOKIE, this.client_secret);
    //     }
    // }

    // // charge le client_secret depuis le local storage
    // loadClientSecretFromLocalStorage(){
    //     let tempValue = localStorage.getItem(Constants.CLIENT_SECRET_COOKIE);
    //     if (tempValue)
    //         this.client_secret = tempValue;
    // }

    // Enregistre le access token dans le local storage
    saveAccessTokenToLocalStorage(p_value?: string){
        if (p_value){
            localStorage.setItem(Constants.ACCESS_TOKEN_COOKIE, p_value);
            this.accessToken = p_value;
        }
        else{
            if (this.accessToken) 
                localStorage.setItem(Constants.ACCESS_TOKEN_COOKIE, this.accessToken.toString());
        }
    }

    // charge le access_token depuis le local storage
    loadAccessTokenFromLocalStorage(){
        let tempValue = localStorage.getItem(Constants.ACCESS_TOKEN_COOKIE);
        if (tempValue)
            this.accessToken = tempValue;
    }

    // Enregistre le refresh token dans le local storage
    saveRefreshTokenToLocalStorage(p_value?: string){        
        if (p_value){
            localStorage.setItem(Constants.REFRESH_TOKEN_COOKIE, p_value);
            this.refresh_token = p_value;
        }
        else{
            if (this.refresh_token) 
                localStorage.setItem(Constants.REFRESH_TOKEN_COOKIE, this.refresh_token);
        }
    }

    // charge le refresh_token depuis le local storage
    loadRefreshTokenFromLocalStorage(){
        let tempValue = localStorage.getItem(Constants.REFRESH_TOKEN_COOKIE);
        if (tempValue)
            this.refresh_token = tempValue;
    }

    // // Enregistre le refresh token dans le local storage
    // saveCodeToLocalStorage(p_value?: string){        
    //     if (p_value){
    //         localStorage.setItem(Constants.CODE_COOKIE, p_value);
    //         this.code = p_value;
    //     }
    //     else{
    //         if (this.code) 
    //             localStorage.setItem(Constants.CODE_COOKIE, this.code);
    //     }
    // }

    // // charge le refresh_token depuis le local storage
    // loadCodeFromLocalStorage(){
    //     let tempValue = localStorage.getItem(Constants.CODE_COOKIE);
    //     if (tempValue)
    //         this.code = tempValue;
    // }

    // Enregistre la date d'expiration du token
    saveExpiresAtToLocalStorage(p_value?: number){        
        if (p_value){
            localStorage.setItem(Constants.EXPIRES_AT_COOKIE, p_value.toString());
            this.expires_at = p_value;
        }
        else{
            if (this.expires_at) 
                localStorage.setItem(Constants.EXPIRES_AT_COOKIE, this.expires_at.toString());
        }
    }

    // charge la date d'expiration du token
    loadExpiresAtFromLocalStorage(){
        let tempValue = localStorage.getItem(Constants.EXPIRES_AT_COOKIE);
        if (tempValue)
            this.expires_at = parseInt(tempValue);
    }
}

/**
 * Strava API v3
 * Strava API
 *
 * OpenAPI spec version: 3.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * Encapsulates the errors that may be returned from the API.
 */
export interface Fault {
    /**
     * The set of specific errors associated with this fault, if any.
     */
    errors?: Array<Error>;
    /**
     * The message of the fault.
     */
    message?: string;
}

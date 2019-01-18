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


export interface Split {
    /**
     * The average speed of this split, in meters per second
     */
    averageSpeed?: number;
    /**
     * The distance of this split, in meters
     */
    distance?: number;
    /**
     * The elapsed time of this split, in seconds
     */
    elapsedTime?: number;
    /**
     * The elevation difference of this split, in meters
     */
    elevationDifference?: number;
    /**
     * The pacing zone of this split
     */
    paceZone?: number;
    /**
     * The moving time of this split, in seconds
     */
    movingTime?: number;
    /**
     * N/A
     */
    split?: number;
}
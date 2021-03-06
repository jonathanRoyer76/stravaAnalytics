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
import { LatLng } from './latLng';
import { SummarySegmentEffort } from './summarySegmentEffort';


export interface SummarySegment {
    /**
     * The unique identifier of this segment
     */
    id?: number;
    /**
     * The name of this segment
     */
    name?: string;
    activityType?: SummarySegment.ActivityTypeEnum;
    /**
     * The segment's distance, in meters
     */
    distance?: number;
    /**
     * The segment's average grade, in percents
     */
    averageGrade?: number;
    /**
     * The segments's maximum grade, in percents
     */
    maximumGrade?: number;
    /**
     * The segments's highest elevation, in meters
     */
    elevationHigh?: number;
    /**
     * The segments's lowest elevation, in meters
     */
    elevationLow?: number;
    startLatlng?: LatLng;
    endLatlng?: LatLng;
    /**
     * The category of the climb
     */
    climbCategory?: number;
    /**
     * The segments's city.
     */
    city?: string;
    /**
     * The segments's state or geographical region.
     */
    state?: string;
    /**
     * The segment's country.
     */
    country?: string;
    /**
     * Whether this segment is private.
     */
    _private?: boolean;
    athletePrEffort?: SummarySegmentEffort;
}
export namespace SummarySegment {
    export type ActivityTypeEnum = 'Ride' | 'Run';
    export const ActivityTypeEnum = {
        Ride: 'Ride' as ActivityTypeEnum,
        Run: 'Run' as ActivityTypeEnum
    }
}

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
import { MetaActivity } from './metaActivity';
import { MetaAthlete } from './metaAthlete';
import { SummarySegment } from './summarySegment';
import { SummarySegmentEffort } from './summarySegmentEffort';


export interface DetailedSegmentEffort {
    /**
     * The unique identifier of this effort
     */
    id?: number;
    /**
     * The effort's elapsed time
     */
    elapsedTime?: number;
    /**
     * The time at which the effort was started.
     */
    startDate?: Date;
    /**
     * The time at which the effort was started in the local timezone.
     */
    startDateLocal?: Date;
    /**
     * The effort's distance in meters
     */
    distance?: number;
    /**
     * Whether this effort is the current best on the leaderboard
     */
    isKom?: boolean;
    /**
     * The name of the segment on which this effort was performed
     */
    name?: string;
    activity?: MetaActivity;
    athlete?: MetaAthlete;
    /**
     * The effort's moving time
     */
    movingTime?: number;
    /**
     * The start index of this effort in its activity's stream
     */
    startIndex?: number;
    /**
     * The end index of this effort in its activity's stream
     */
    endIndex?: number;
    /**
     * The effort's average cadence
     */
    averageCadence?: number;
    /**
     * The average wattage of this effort
     */
    averageWatts?: number;
    /**
     * For riding efforts, whether the wattage was reported by a dedicated recording device
     */
    deviceWatts?: boolean;
    /**
     * The heart heart rate of the athlete during this effort
     */
    averageHeartrate?: number;
    /**
     * The maximum heart rate of the athlete during this effort
     */
    maxHeartrate?: number;
    segment?: SummarySegment;
    /**
     * The rank of the effort on the global leaderboard if it belongs in the top 10 at the time of upload
     */
    komRank?: number;
    /**
     * The rank of the effort on the athlete's leaderboard if it belongs in the top 3 at the time of upload
     */
    prRank?: number;
    /**
     * Whether this effort should be hidden when viewed within an activity
     */
    hidden?: boolean;
}

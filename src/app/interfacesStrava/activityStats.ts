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
import { ActivityTotal } from './activityTotal';


/**
 * A set of rolled-up statistics and totals for an athlete
 */
export interface ActivityStats {
    /**
     * The longest distance ridden by the athlete.
     */
    biggestRideDistance?: number;
    /**
     * The highest climb ridden by the athlete.
     */
    biggestClimbElevationGain?: number;
    /**
     * The recent (last 4 weeks) ride stats for the athlete.
     */
    recentRideTotals?: ActivityTotal;
    /**
     * The recent (last 4 weeks) run stats for the athlete.
     */
    recentRunTotals?: ActivityTotal;
    /**
     * The recent (last 4 weeks) swim stats for the athlete.
     */
    recentSwimTotals?: ActivityTotal;
    /**
     * The year to date ride stats for the athlete.
     */
    ytdRideTotals?: ActivityTotal;
    /**
     * The year to date run stats for the athlete.
     */
    ytdRunTotals?: ActivityTotal;
    /**
     * The year to date swim stats for the athlete.
     */
    ytdSwimTotals?: ActivityTotal;
    /**
     * The all time ride stats for the athlete.
     */
    allRideTotals?: ActivityTotal;
    /**
     * The all time run stats for the athlete.
     */
    allRunTotals?: ActivityTotal;
    /**
     * The all time swim stats for the athlete.
     */
    allSwimTotals?: ActivityTotal;
}

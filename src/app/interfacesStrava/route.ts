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
import { PolylineMap } from './polylineMap';
import { RouteDirection } from './routeDirection';
import { SummaryAthlete } from './summaryAthlete';
import { SummarySegment } from './summarySegment';


export interface Route {
    athlete?: SummaryAthlete;
    /**
     * The description of the route
     */
    description?: string;
    /**
     * The route's distance, in meters
     */
    distance?: number;
    /**
     * The route's elevation gain.
     */
    elevationGain?: number;
    /**
     * The unique identifier of this route
     */
    id?: number;
    map?: PolylineMap;
    /**
     * The name of this route
     */
    name?: string;
    /**
     * Whether this route is private
     */
    _private?: boolean;
    /**
     * Whether this route is starred by the logged-in athlete
     */
    starred?: boolean;
    timestamp?: number;
    /**
     * This route's type (1 for ride, 2 for runs)
     */
    type?: number;
    /**
     * This route's sub-type (1 for road, 2 for mountain bike, 3 for cross, 4 for trail, 5 for mixed)
     */
    subType?: number;
    /**
     * The segments traversed by this route
     */
    segments?: Array<SummarySegment>;
    /**
     * The directions of this route
     */
    directions?: Array<RouteDirection>;
}

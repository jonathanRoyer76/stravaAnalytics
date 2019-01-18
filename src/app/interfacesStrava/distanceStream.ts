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
import { BaseStream } from './baseStream';


export interface DistanceStream {
    /**
     * The number of data points in this stream
     */
    originalSize?: number;
    /**
     * The level of detail (sampling) in which this stream was returned
     */
    resolution?: DistanceStream.ResolutionEnum;
    /**
     * The base series used in the case the stream was downsampled
     */
    seriesType?: DistanceStream.SeriesTypeEnum;
    /**
     * The sequence of distance values for this stream, in meters
     */
    data?: Array<number>;
}
export namespace DistanceStream {
    export type ResolutionEnum = 'low' | 'medium' | 'high';
    export const ResolutionEnum = {
        Low: 'low' as ResolutionEnum,
        Medium: 'medium' as ResolutionEnum,
        High: 'high' as ResolutionEnum
    }
    export type SeriesTypeEnum = 'distance' | 'time';
    export const SeriesTypeEnum = {
        Distance: 'distance' as SeriesTypeEnum,
        Time: 'time' as SeriesTypeEnum
    }
}
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
import { SummaryAthlete } from './summaryAthlete';
import { SummaryClub } from './summaryClub';
import { SummaryGear } from './summaryGear';


export interface DetailedAthlete {
    /**
     * The unique identifier of the athlete
     */
    id?: number;
    /**
     * Resource state, indicates level of detail. Possible values: 1 -> \"meta\", 2 -> \"summary\", 3 -> \"detail\"
     */
    resourceState?: number;
    /**
     * The athlete's first name.
     */
    firstname?: string;
    /**
     * The athlete's last name.
     */
    lastname?: string;
    /**
     * URL to a 62x62 pixel profile picture.
     */
    profile_medium?: string;
    /**
     * URL to a 124x124 pixel profile picture.
     */
    profile?: string;
    /**
     * The athlete's city.
     */
    city?: string;
    /**
     * The athlete's state or geographical region.
     */
    state?: string;
    /**
     * The athlete's country.
     */
    country?: string;
    /**
     * The athlete's sex.
     */
    sex?: DetailedAthlete.SexEnum;
    /**
     * Whether the currently logged-in athlete follows this athlete.
     */
    friend?: DetailedAthlete.FriendEnum;
    /**
     * Whether this athlete follows the currently logged-in athlete.
     */
    follower?: DetailedAthlete.FollowerEnum;
    /**
     * Deprecated.  Use summit field instead. Whether the athlete has any Summit subscription.
     */
    premium?: boolean;
    /**
     * Whether the athlete has any Summit subscription.
     */
    summit?: boolean;
    /**
     * The time at which the athlete was created.
     */
    createdAt?: Date;
    /**
     * The time at which the athlete was last updated.
     */
    updatedAt?: Date;
    /**
     * The athlete's follower count.
     */
    followerCount?: number;
    /**
     * The athlete's friend count.
     */
    friendCount?: number;
    /**
     * The number or athletes mutually followed by this athlete and the currently logged-in athlete.
     */
    mutualFriendCount?: number;
    /**
     * The athlete's preferred unit system.
     */
    measurementPreference?: DetailedAthlete.MeasurementPreferenceEnum;
    /**
     * The athlete's FTP (Functional Threshold Power).
     */
    ftp?: number;
    /**
     * The athlete's weight.
     */
    weight?: number;
    /**
     * The athlete's clubs.
     */
    clubs?: Array<SummaryClub>;
    /**
     * The athlete's bikes.
     */
    bikes?: Array<SummaryGear>;
    /**
     * The athlete's shoes.
     */
    shoes?: Array<SummaryGear>;
}
export namespace DetailedAthlete {
    export type SexEnum = 'M' | 'F';
    export const SexEnum = {
        M: 'M' as SexEnum,
        F: 'F' as SexEnum
    }
    export type FriendEnum = 'pending' | 'accepted' | 'blocked';
    export const FriendEnum = {
        Pending: 'pending' as FriendEnum,
        Accepted: 'accepted' as FriendEnum,
        Blocked: 'blocked' as FriendEnum
    }
    export type FollowerEnum = 'pending' | 'accepted' | 'blocked';
    export const FollowerEnum = {
        Pending: 'pending' as FollowerEnum,
        Accepted: 'accepted' as FollowerEnum,
        Blocked: 'blocked' as FollowerEnum
    }
    export type MeasurementPreferenceEnum = 'feet' | 'meters';
    export const MeasurementPreferenceEnum = {
        Feet: 'feet' as MeasurementPreferenceEnum,
        Meters: 'meters' as MeasurementPreferenceEnum
    }
}

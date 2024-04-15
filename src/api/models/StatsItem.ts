/* tslint:disable */
/* eslint-disable */
/**
 * TeddyCloud API
 * OpenAPI specification for TeddyCloud Backend API
 *
 * The version of the OpenAPI document: 1.1.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * Stats item.
 * @export
 * @interface StatsItem
 */
export interface StatsItem {
    /**
     * Object title
     * @type {string}
     * @memberof StatsItem
     */
    iD: string;
    /**
     * Object description
     * @type {string}
     * @memberof StatsItem
     */
    description: string;
    /**
     * Object value
     * @type {string}
     * @memberof StatsItem
     */
    value: string;
}

/**
 * Check if a given object implements the StatsItem interface.
 */
export function instanceOfStatsItem(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "iD" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "value" in value;

    return isInstance;
}

export function StatsItemFromJSON(json: any): StatsItem {
    return StatsItemFromJSONTyped(json, false);
}

export function StatsItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatsItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'iD': json['ID'],
        'description': json['description'],
        'value': json['value'],
    };
}

export function StatsItemToJSON(value?: StatsItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ID': value.iD,
        'description': value.description,
        'value': value.value,
    };
}


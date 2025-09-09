/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRuleRequest } from '../models/CreateRuleRequest';
import type { Rule } from '../models/Rule';
import type { RulePagedResponse } from '../models/RulePagedResponse';
import type { UpdateRuleRequest } from '../models/UpdateRuleRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RulesService {
    /**
     * @param page
     * @param pageSize
     * @param search
     * @param sortBy
     * @param sortDirection
     * @returns RulePagedResponse OK
     * @throws ApiError
     */
    public static getApiRules(
        page?: number,
        pageSize?: number,
        search?: string,
        sortBy?: string,
        sortDirection?: string,
    ): CancelablePromise<RulePagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Rules',
            query: {
                'Page': page,
                'PageSize': pageSize,
                'Search': search,
                'SortBy': sortBy,
                'SortDirection': sortDirection,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Rule OK
     * @throws ApiError
     */
    public static postApiRules(
        requestBody?: CreateRuleRequest,
    ): CancelablePromise<Rule> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Rules',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns Rule OK
     * @throws ApiError
     */
    public static getApiRules1(
        id: number,
    ): CancelablePromise<Rule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Rules/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Rule OK
     * @throws ApiError
     */
    public static putApiRules(
        id: number,
        requestBody?: UpdateRuleRequest,
    ): CancelablePromise<Rule> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Rules/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiRules(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Rules/{id}',
            path: {
                'id': id,
            },
        });
    }
}

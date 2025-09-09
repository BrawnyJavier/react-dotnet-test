/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Rule } from './Rule';
export type RulePagedResponse = {
    data?: Array<Rule> | null;
    totalCount?: number;
    page?: number;
    pageSize?: number;
    readonly totalPages?: number;
    readonly hasPrevious?: boolean;
    readonly hasNext?: boolean;
};


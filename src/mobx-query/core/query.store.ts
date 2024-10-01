import { makeAutoObservable } from 'mobx';
import { MobXQuery } from './MobXQuery';
import { QueryClient, QueryObserverOptions } from '@tanstack/query-core';
import { DefaultError, QueryKey } from '@tanstack/react-query';

export class QueryStore<
    TQueryFnData = unknown,
    TData = TQueryFnData,
    TResultData = unknown,
    TVariables = unknown,
    TError = DefaultError
> {
    private query: MobXQuery<TQueryFnData, TData, TResultData, TError, QueryKey>;
    private variables: TVariables | undefined;

    constructor(
        private params: {
            options: (variables?: TVariables) => QueryObserverOptions<TQueryFnData, TError, TData, TData, QueryKey>;
            client: QueryClient;
            autoFetch?: boolean;
        }
    ) {
        this.query = new MobXQuery<TQueryFnData, TData, TResultData, TError, QueryKey>(
            () => ({
                ...this.params.options(this.variables),
                enabled: this.params.autoFetch,
            }),
            this.params.client
        );

        makeAutoObservable(this);
    }

    public fetch(variables?: TVariables) {
        this.variables = variables;
        this.query = new MobXQuery(
            () => ({
                ...this.params.options(this.variables),
            }),
            this.params.client
        );
        this.query.fetch();
    }

    public get isLoading() {
        return this.query.result.isLoading;
    }

    public get isSuccess() {
        return this.query.result.isSuccess;
    }

    public get isError() {
        return this.query.result.isError;
    }

    public get isPending() {
        return this.query.result.isPending;
    }

    public get data() {
        return this.query.data?.data;
    }

    public get error() {
        return this.query.result.error;
    }

    public get result() {
        return this.query.result;
    }

    public get refetch() {
        return this.query.result.refetch();
    }
}

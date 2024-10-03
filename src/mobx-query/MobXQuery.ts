import {
    DefaultedQueryObserverOptions,
    QueryClient,
    QueryKey,
    QueryObserver,
    QueryObserverOptions,
    QueryObserverResult,
} from '@tanstack/query-core';
import { BaseMobXQuery } from './BaseMobXQuery';
import { DefaultError } from '@tanstack/query-core';

export class MobXQuery<
    TQueryFnData = unknown,
    TData = TQueryFnData,
    TResultData = unknown,
    TError = DefaultError,
    TQueryKey extends QueryKey = QueryKey
> extends BaseMobXQuery<
    QueryObserver<TQueryFnData, TError, TData, TData, TQueryKey>,
    QueryObserverOptions<TQueryFnData, TError, TData, TData, TQueryKey>,
    DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TData, TQueryKey>,
    QueryObserverResult<{ data: TResultData }>
> {
    protected observer: QueryObserver<TQueryFnData, TError, TData, TData, TQueryKey>;

    constructor(
        getOptions: () => QueryObserverOptions<TQueryFnData, TError, TData, TData, TQueryKey>,
        queryClient: QueryClient
    ) {
        super(getOptions, queryClient);
        this.observer = new QueryObserver(queryClient, this.getDefaultedOptions());
    }

    protected getDefaultedOptions() {
        return this.queryClient.defaultQueryOptions(this.getOptions());
    }

    protected setObserverOptions(
        options: DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TData, TQueryKey>
    ) {
        this.observer.setOptions(options);
    }

    protected subscribeObserver(onChange: () => void) {
        return this.observer.subscribe(onChange);
    }

    public getCurrentResult() {
        return this.observer.getCurrentResult() as QueryObserverResult<{ data: TResultData }>;
    }

    public fetch() {
        return this.queryClient.fetchQuery(this.getDefaultedOptions());
    }

    public get data() {
        return this.result.data;
    }
}


import { createAtom, reaction } from 'mobx';
import { DefaultError, QueryClient, QueryKey, QueryObserver, QueryObserverOptions } from '@tanstack/query-core';

export class MobXQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
> {
    private atom = createAtom(
        'MobXQuery',
        () => this.startTicking(),
        () => this.stopTicking()
    );

    private queryObserver = new QueryObserver(this.queryClient, this.defaultedQueryOptions);

    constructor(
        private getOptions: () => QueryObserverOptions<TQueryFnData, TData, TError, TQueryData, TQueryKey>,
        private queryClient: QueryClient
    ) {}

    public fetch() {
        return this.queryClient.fetchQuery(this.defaultedQueryOptions);
    }

    public get result() {
        this.atom.reportObserved();
        this.queryObserver.setOptions(this.defaultedQueryOptions);
        return this.queryObserver.getOptimisticResult(this.defaultedQueryOptions);
    }

    public get data(): TData {
        const { data } = this.result;
        return data as TData;
    }

    private unsubscribe = () => {};
    private startTicking() {
        const unsubscribeReaction = reaction(
            () => this.defaultedQueryOptions,
            () => this.queryObserver.setOptions(this.defaultedQueryOptions)
        );
        const unsubscribeObserver = this.queryObserver.subscribe(() => {
            this.atom.reportChanged();
        });

        this.unsubscribe = () => {
            unsubscribeReaction();
            unsubscribeObserver();
        };
    }

    private stopTicking() {
        this.unsubscribe();
    }

    private get defaultedQueryOptions() {
        return this.queryClient.defaultQueryOptions(this.getOptions());
    }
}

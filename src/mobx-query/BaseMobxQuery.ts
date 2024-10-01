import { DefaultedQueryObserverOptions, DefaultError, QueryClient, QueryKey, QueryObserver, QueryObserverOptions } from '@tanstack/react-query';
import { createAtom, reaction } from 'mobx';



// export class BaseMobXQuery<
//     TQueryFnData = unknown,
//     TError extends Error = DefaultError, 
//     TData = TQueryFnData,
//     TQueryData = TQueryFnData,
//     TQueryKey extends QueryKey = QueryKey
// > {
//     protected atom = createAtom(
//         'MobXQueryAtom',
//         () => this.startTicking(),
//         () => this.stopTicking()
//     );

//     protected queryObserver: QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>;

//     constructor(
//         private getOptions: () => QueryObserverOptions<TQueryFnData, TData, TError, TQueryData, TQueryKey>,
//         private queryClient: QueryClient
//     ) {
//         this.queryObserver = new QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
//             this.queryClient,
//             this.defaultedQueryOptions
//         );
//     }

//     private unsubscribe = () => {};
    
//     public startTicking() {
//         const unsubscribeReaction = reaction(
//             () => this.defaultedQueryOptions,
//             () => this.queryObserver.setOptions(this.defaultedQueryOptions)
//         );

//         const unsubscribeObserver = this.queryObserver.subscribe(() => {
//             this.atom.reportChanged();
//         });

//         this.unsubscribe = () => {
//             unsubscribeReaction();
//             unsubscribeObserver();
//         };
//     }

//     public stopTicking() {
//         this.unsubscribe();
//     }

//     protected get defaultedQueryOptions(): DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey> {
//         return this.queryClient.defaultQueryObserverOptions(this.getOptions());
//     }
// }



export abstract class BaseMobX<TObserver, TOptions, TDefaultedOptions, TResult> {
    protected atom = createAtom(
        'MobXBase',
        () => this.startTicking(),
        () => this.stopTicking()
    );

    protected abstract observer: TObserver;

    constructor(
        protected getOptions: () => TOptions,
        protected queryClient: QueryClient
    ) {}

    private unsubscribe = () => {};

    protected startTicking() {
        const unsubscribeReaction = reaction(
            () => this.getDefaultedOptions(),
            () => this.setObserverOptions(this.getDefaultedOptions())
        );

        const unsubscribeObserver = this.subscribeObserver(() => {
            this.atom.reportChanged();
        });

        this.unsubscribe = () => {
            unsubscribeReaction();
            unsubscribeObserver();
        };
    }

    protected stopTicking() {
        this.unsubscribe();
    }

    protected abstract getDefaultedOptions(): TDefaultedOptions;

    protected abstract setObserverOptions(options: TDefaultedOptions): void;

    protected abstract subscribeObserver(onChange: () => void): () => void;

    public get result(): TResult {
        this.atom.reportObserved();
        this.setObserverOptions(this.getDefaultedOptions());
        return this.getCurrentResult();
    }

    protected abstract getCurrentResult(): TResult;
}




// export class MobXQuery<
//     TQueryFnData = unknown,
//     TError = unknown,
//     TData = TQueryFnData,
//     TQueryData = TQueryFnData,
//     TQueryKey extends QueryKey = QueryKey
// > extends BaseMobX<
//     QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
//     QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
//     DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
//     any // Adjust TResult as needed
// > {
//     protected observer: QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>;

//     constructor(
//         getOptions: () => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
//         queryClient: QueryClient
//     ) {
//         super(getOptions, queryClient);
//         this.observer = new QueryObserver(queryClient, this.getDefaultedOptions());
//     }

//     protected getDefaultedOptions() {
//         return this.queryClient.defaultQueryOptions(this.getOptions());
//     }

//     protected setObserverOptions(options: DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>) {
//         this.observer.setOptions(options);
//     }

//     protected subscribeObserver(onChange: () => void) {
//         return this.observer.subscribe(onChange);
//     }

//     protected getCurrentResult() {
//         return this.observer.getCurrentResult();
//     }

//     public fetch() {
//         return this.queryClient.fetchQuery(this.getDefaultedOptions());
//     }

//     public get data(): TData | undefined {
//         return this.result.data;
//     }
// }

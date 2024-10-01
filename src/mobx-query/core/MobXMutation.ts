import { MutationObserverOptions, QueryClient, MutationObserver } from '@tanstack/query-core';
import { BaseMobXQuery } from './BaseMobXQuery';
import { MutationObserverResult } from '@tanstack/react-query';

// export class MobXMutation<
//     TData = unknown,
//     TVariables = void,
//     TResultData = unknown,
//     TError = unknown,
//     TContext = unknown
// > extends BaseMobXQuery<
//     MutationObserver<TData, TError, TVariables, TContext>,
//     MutationObserverOptions<TData, TError, TVariables, TContext>,
//     MutationObserverOptions<TData, TError, TVariables, TContext>,
//     any
// > {
//     protected observer: MutationObserver<TData, TError, TVariables, TContext>;

//     constructor(
//         getOptions: () => MutationObserverOptions<TData, TError, TVariables, TContext>,
//         queryClient: QueryClient
//     ) {
//         super(getOptions, queryClient);
//         this.observer = new MutationObserver(queryClient, this.getDefaultedOptions());
//     }

//     protected getDefaultedOptions() {
//         return this.queryClient.defaultMutationOptions(this.getOptions());
//     }

//     protected setObserverOptions(options: MutationObserverOptions<TData, TError, TVariables, TContext>) {
//         this.observer.setOptions(options);
//     }

//     protected subscribeObserver(onChange: () => void) {
//         return this.observer.subscribe(onChange);
//     }

//     protected getCurrentResult() {
//         return this.observer.getCurrentResult();
//     }

//     public mutate(variables: TVariables) {
//         this.observer.mutate(variables);
//     }

//     public async mutateAsync(variables: TVariables): Promise<TData> {
//         return await this.observer.mutate(variables)
//     }
// }



export class MobXMutation<
    TData = unknown,           
    TVariables = void,        
    TError = unknown,          
    TContext = unknown         
> extends BaseMobXQuery<
    MutationObserver<TData, TError, TVariables, TContext>,
    MutationObserverOptions<TData, TError, TVariables, TContext>,
    MutationObserverOptions<TData, TError, TVariables, TContext>,
    MutationObserverResult<TData, TError, TVariables, TContext> 
> {
    protected observer: MutationObserver<TData, TError, TVariables, TContext>;

    constructor(
        getOptions: () => MutationObserverOptions<TData, TError, TVariables, TContext>,
        queryClient: QueryClient
    ) {
        super(getOptions, queryClient);
        this.observer = new MutationObserver(queryClient, this.getDefaultedOptions());
    }

    protected getDefaultedOptions() {
        return this.queryClient.defaultMutationOptions(this.getOptions());
    }

    protected setObserverOptions(options: MutationObserverOptions<TData, TError, TVariables, TContext>) {
        this.observer.setOptions(options);
    }

    protected subscribeObserver(onChange: () => void) {
        return this.observer.subscribe(onChange);
    }

    public getCurrentResult(): MutationObserverResult<TData, TError, TVariables, TContext> {
        return this.observer.getCurrentResult();
    }

    public mutate(variables: TVariables) {
        this.observer.mutate(variables);
    }

    public async mutateAsync(variables: TVariables): Promise<TData> {
        return await this.observer.mutate(variables);
    }

    public get data(): TData | undefined {
        return this.result.data;
    }

}

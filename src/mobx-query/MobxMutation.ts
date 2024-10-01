import { createAtom, reaction } from 'mobx';
import { MutationObserver, QueryClient, MutationObserverOptions, DefaultError } from '@tanstack/query-core';

export class MobXMutation<
TData = unknown,
TError = DefaultError,
TVariables = void,
TContext = unknown,
> {
    private atom = createAtom(
        'MobXMutation',
        () => this.startTicking(),
        () => this.stopTicking()
    );

    private mutationObserver: MutationObserver<TData, TError, TVariables, TContext>;

    constructor(
        private getOptions: () => MutationObserverOptions<TData, TError, TVariables, TContext>,
        private queryClient: QueryClient
    ) {
        this.mutationObserver = new MutationObserver(queryClient, this.defaultedMutationOptions);
    }

    public mutate(variables: TVariables) {
        this.mutationObserver.mutate(variables);
    }


    public async mutateAsync(variables: TVariables) {
        return new Promise<TData>((resolve, reject) => {
            this.mutationObserver.mutate(variables, {
                onSuccess: (data) => resolve(data),
                onError: (error) => reject(error),
            });
        });
    }


    public get result() {
        this.atom.reportObserved();
        this.mutationObserver.setOptions(this.defaultedMutationOptions);
        return this.mutationObserver.getCurrentResult();
    }

    private unsubscribe = () => {};

    private startTicking() {
        console.log('startTicking');
        const unsubscribeReaction = reaction(
            () => this.defaultedMutationOptions,
            () => this.mutationObserver.setOptions(this.defaultedMutationOptions)
        );

        const unsubscribeObserver = this.mutationObserver.subscribe(() => {
            this.atom.reportChanged();
        });

        this.unsubscribe = () => {
            unsubscribeReaction();
            unsubscribeObserver();
        };
    }

    private stopTicking() {
        console.log('stopTicking');
        this.unsubscribe();
    }

    private get defaultedMutationOptions() {
        return this.queryClient.defaultMutationOptions(this.getOptions());
    }
}
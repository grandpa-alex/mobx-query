import { makeAutoObservable } from 'mobx';
import { QueryClient } from '@tanstack/query-core';
import { MutationObserverOptions } from '@tanstack/react-query';
import { MobXMutation } from './MobXMutation';

export class MutateStore<
    TData = unknown,
    TVariables = void,
    TResultData = unknown,
    TError = unknown,
    TContext = unknown
> {
    private mutation: MobXMutation<TData, TVariables, TError, TContext>;
    private variables: TVariables | undefined;

    constructor(
        private params: {
            options: (variables?: TVariables) => MutationObserverOptions<TData, TError, TVariables, TContext>;
            client: QueryClient;
        }
    ) {
        this.mutation = new MobXMutation<TData, TVariables, TError, TContext>(
            () => ({
                ...this.params.options(this.variables),
            }),
            this.params.client
        );

        makeAutoObservable(this);
    }

    public mutate(variables?: TVariables) {
        this.variables = variables;
        this.mutation.mutate(variables!);
    }

    public async mutateAsync(variables?: TVariables): Promise<TData> {
        return await this.mutation.mutateAsync(variables!);
    }

    public get isLoading(): boolean {
        return this.mutation.result.isPending;
    }

    public get isSuccess(): boolean {
        return this.mutation.result.isSuccess;
    }

    public get isError(): boolean {
        return this.mutation.result.isError;
    }

    public get data(): TResultData | undefined {
        if (this.mutation.data) {
            const data: any = this.mutation.data;
            return data.data as TResultData;
        }
        return undefined;
    }

    public get error(): TError | null {
        return this.mutation.result.error;
    }

    public get context(): TContext | undefined {
        return this.mutation.result.context;
    }

    public get result() {
        return this.mutation.result;
    }
}

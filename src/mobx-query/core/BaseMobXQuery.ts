import { QueryClient } from '@tanstack/react-query';
import { createAtom, reaction } from 'mobx';

export abstract class BaseMobXQuery<TObserver, TOptions, TDefaultedOptions, TResult> {
    protected atom = createAtom(
        'BaseMobXQuery',
        () => this.startTicking(),
        () => this.stopTicking()
    );

    protected abstract observer: TObserver;

    constructor(protected getOptions: () => TOptions, protected queryClient: QueryClient) {}

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

    protected abstract getCurrentResult(): TResult;

    public get result(): TResult {
        this.atom.reportObserved();
        this.setObserverOptions(this.getDefaultedOptions());
        return this.getCurrentResult();
    }
}

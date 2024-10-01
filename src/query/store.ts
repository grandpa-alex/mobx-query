import { makeAutoObservable } from 'mobx';
import { MobXQuery } from './MobxQuery1';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { sleep } from './QueryComponent';

const queryClient = new QueryClient();

const fetchData = async () => {
    return await axios.get('https://catfact.ninja/facts?limit=10');
};

export class FactStore {
    catFacts = new MobXQuery(
        () => ({
            queryKey: ['facts'],
            queryFn: fetchData,
        }),
        queryClient
    );

    constructor() {
        makeAutoObservable(this);
    }

    get getFacts() {
        return this.catFacts.data ?? [];
    }
}

export const factStore = new FactStore();

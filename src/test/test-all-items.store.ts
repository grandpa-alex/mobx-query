import { makeAutoObservable } from 'mobx';
import { QueryClient, QueryObserverOptions } from '@tanstack/react-query';
import axios from 'axios';

import { sleep } from '../query/QueryComponent';
import { MobXQuery } from '../mobx-query/core/MobXQuery';
import { QueryStore } from '../mobx-query/core/query.store';

const queryClient = new QueryClient();

const fetchGetData = async () => {
    const response = await axios.get('http://localhost:3001/items');
    await sleep(3000);
    return response;
};


const fetchGetItemData = async (item: number) => {
    console.log('fetchGetItemData', item);
    
    const response = await axios.get(`http://localhost:3001/items/${item}`);
    await sleep(3000);
    return response;
};


// export class QueryStore<TData, TVariables, TResultData, TError> {

class TestAllItemsStore {
    public allItemsStore: QueryStore<any, any, []>
    public itemsStore: QueryStore<any, number, any, any>

    constructor() {
        this.allItemsStore = new QueryStore(
            {
                options: () => ({
                    queryKey: ['items'],
                    queryFn: fetchGetData,
                }),
                client: queryClient,
            }
        );

        this.itemsStore = new QueryStore(
            {
                options:  (item?: number) => ({
                    queryKey: ['item', item], 
                    queryFn: () => fetchGetItemData(item!), 
                }),
                client: queryClient,
                autoFetch: false
            }
        );

        makeAutoObservable(this);
    }



    // private getDataQuery = new MobXQuery(
    //     () => ({
    //         queryKey: ['data'],
    //         queryFn: fetchGetData,
    //     }),
    //     queryClient
    // );

    public get ItemIsLoading() {
        return this.itemsStore.isLoading
    }

    public get itemData() {
        return this.itemsStore.data ?? {}
    }


    public fetchItemData(item: number) {
        return this.itemsStore.fetch(item) 
    }

  

    public get isLoading() {
        return this.allItemsStore.isLoading
    }

    public get error() {
        return this.allItemsStore.error;
    }


    public get getAllData() {
        return this.allItemsStore.data ?? []
    }

    public get getAllDataOptions() {
        return this.allItemsStore.result;
    }

}

export const testAllItemsStore = new TestAllItemsStore();

import { makeAutoObservable } from 'mobx';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { sleep } from '../query/QueryComponent';
import { startTransition } from 'react';
import { MobXMutation } from '../mobx-query/MobXMutation';

const queryClient = new QueryClient();


const fetchAddItem = async (newItem: any) => {
    const response = await axios.post('http://localhost:3001/items', newItem);
    await sleep(3000);
    return response.data;
};


class TestAddItemStore {
    private addItemMutation: MobXMutation<any, Error, any, unknown>;

    constructor() {
        makeAutoObservable(this);

        this.addItemMutation = new MobXMutation(
            () => ({
                mutationKey: ['add-item'],
                mutationFn: fetchAddItem,
            }),
            queryClient
        );
    }


    public async addItem(newItem: any) {
        console.log('START');
        
        const res = this.addItemMutation.mutateAsync(newItem);
        console.log('res', res);
        return res
    }

    public get isAdding() {
        return this.addItemMutation.result.isPending;
    }

    // public get addItemError() {
    //     return this.addItemMutation.error;
    // }

    // public get isAddSuccess() {
    //     return this.addItemMutation.isSuccess;
    // }
}

export const testAddItemStore = new TestAddItemStore();
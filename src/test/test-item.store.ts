import { makeAutoObservable } from 'mobx';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { sleep } from '../query/QueryComponent';
import { startTransition } from 'react';
import { MobXQuery } from '../mobx-query/MobXQuery';

const queryClient = new QueryClient();

const fetchGetItemData = async (item: number) => {
    console.log('fetchGetItemData', item);
    
    const response = await axios.get(`http://localhost:3001/items/${item}`);
    await sleep(3000);
    return response;
};

class TestItemStore {
    private itemQuery: MobXQuery<any, Error, any, any, [string, number]> | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Метод для получения данных по item
 // Метод для получения данных по item с использованием startTransition
 public fetchItemData(item: number) {
    // Используем startTransition для централизованного управления асинхронными изменениями

        // if (!this.itemQuery || this.itemQuery.result.queryKey[1] !== item) {e
            // Если нет запроса или запрос для другого item, создаем новый
            // if (!this.itemQuery) {
                this.itemQuery = new MobXQuery(
                    () => ({
                        queryKey: ['item-data', item],  // Уникальный ключ для кэширования
                        queryFn: () => fetchGetItemData(item),  // Передаем item в запрос
                    }),
                    queryClient
                );
            // }
         
        // }
    
}

    // Геттер для данных по item
    public get itemData() {
        const data = this.itemQuery?.data;

        if (this.isLoading || !data) {
            return undefined; // Возвращаем undefined, пока данные не загружены
        }

        return data.data; // Возвращаем данные, когда они полностью загружены
    }

    // Геттер для состояния загрузки
    public get isLoading() {
        return this.itemQuery?.result.isLoading ?? false;
    }

    // Геттер для состояния ошибки
    public get error() {
        return this.itemQuery?.result.error ?? null;
    }
}

export const testItemStore = new TestItemStore();
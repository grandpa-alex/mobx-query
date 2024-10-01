import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { FactStore } from './store';
import { observer } from 'mobx-react-lite';
import { observe } from 'mobx';

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};


const factStore = new FactStore();

export const QueryComponent = observer(() => {
    // const { data, error, isLoading, refetch } = useQuery({
    //     queryKey: ['facts'],
    //     queryFn: fetchData,
    // });

    // useEffect(() => {
    //     if (data) {
    //         factStore.setFacts(data);
    //     }
    // }, [data]);

    // if (isLoading) return <div>Загрузка данных...</div>;
    // if (error) return <div>Ошибка при загрузке данных: {error.message}</div>;

    console.log('AAA', factStore.getFacts);
    

    return (
        <div>
            {/* {factStore.getFacts().map((item: any) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            margin: '10px 0',
                            backgroundColor: 'rgb(223, 223, 223)',
                        }}
                    >
                        {item.fact}
                    </div>
                );
            })} */}

            {/* <button onClick={() => refetch()}>Обновить данные</button> */}
        </div>
    );
})

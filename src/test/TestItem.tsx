import { observer } from 'mobx-react-lite';
import { testAllItemsStore } from './test-all-items.store';
import { stylesBox, stylesItem, stylesLoading } from './Test';
import { testItemStore } from './test-item.store';
import { useEffect, useState } from 'react';

export const TestItem = observer(() => {
    const [value, setValue] = useState(1);

    const handleFetch = () => {
        testAllItemsStore.fetchItemData(value); // Запрашиваем данные по item
    };

    return (
        <div style={stylesBox}>
            <h1>getItemData</h1>
            <input
                type={'number'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(+e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleFetch();
                        // console.log(testItemStore.getItemData(+value));
                    }
                }}
                value={value}
            />
            <div style={stylesItem}>
            {testAllItemsStore.ItemIsLoading ? (
                <div style={stylesLoading}>Loading...</div>
            ) : (
                testAllItemsStore.itemData ? (
                    <div>{testAllItemsStore.itemData.name}</div>
                ) : (
                    <div>Нет данных для отображения</div>
                )
            )}
            </div>
        </div>
    );
});

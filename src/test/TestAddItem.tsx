import { observer } from 'mobx-react-lite';
import { stylesBox, stylesItem, stylesLoading } from './Test';
import { testItemStore } from './test-item.store';
import { useEffect, useState } from 'react';
import { testAddItemStore } from './test-add-item.store';

export const TestAddItem = observer(() => {
    const [value, setValue] = useState('');

    const handleFetch = async () => {
        const a = await testAddItemStore.addItem({
            id: 114,
            name: 'DDDD1'
        })

        console.log('RESULT', a);
        
    };

    // useEffect(() => {
    //     console.log('AAAAA', testItemStore.itemData);
    // }, [testItemStore.itemData]);

    return (
        <div style={stylesBox}>
            <h1>TestAddItem</h1>
            <input
         
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleFetch();
                    }
                }}
                value={value}
            />
            {/* <div style={stylesItem}>
            {testItemStore.isLoading ? (
                <div style={stylesLoading}>Loading...</div>
            ) : (
                testItemStore.itemData ? (
                    <div>{testItemStore.itemData.name}</div>
                ) : (
                    <div>Нет данных для отображения</div>
                )
            )}
            </div> */}
        </div>
    );
});

import { observer } from 'mobx-react-lite';
import { testAllItemsStore } from './test-all-items.store';
import { stylesBox, stylesItem, stylesLoading } from './Test';

export const TestAllItems = observer(() => {
    if (testAllItemsStore.error) {
        return (
            <div>
                Error
            </div>
        )
    }

    console.log('AAAA', testAllItemsStore.getAllData);
    

    return (
            <div style={stylesBox}>
                <h1>getAllData</h1>

                {testAllItemsStore.isLoading ? (
                    <div style={stylesLoading}>Loading...</div>
                ) : (
                    <>
                        <button onClick={() => testAllItemsStore.getAllDataOptions.refetch()}>Refresh</button>
                        {testAllItemsStore.getAllData.map((item: any) => {
                            return (
                                <div key={item.id} style={stylesItem}>
                                    {item.name}
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
    );
});

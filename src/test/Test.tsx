import { TestAddItem } from './TestAddItem';
import { TestAllItems } from './TestAllItems';
import { TestItem } from './TestItem';

export const stylesWrapper: React.CSSProperties = {
    overflow: 'hidden',
    display: 'flex',
    gap: '20px',
    backgroundColor: '#d4f0c7',
    minHeight: '100vh',
    width: '100%',
    height: '100%',
};

export const stylesItem: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#dfdfdf',
};

export const stylesBox: React.CSSProperties = {
    width: '200px',
};

export const stylesLoading: React.CSSProperties = {
    fontSize: '20px',
    color: '#d1a410',
    textAlign: 'center',
    marginTop: '20px',
};

export const Test = () => {
    return (
        <div style={stylesWrapper}>
            <TestAllItems />
            <TestItem />
            <TestAddItem/>
        </div>
    );
};

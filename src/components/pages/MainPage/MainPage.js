import TableRow from '../../features/TableRow/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MainPage.module.css';
import { useEffect } from 'react';
import { fetchTables } from '../../../redux/tablesRedux';


const MainPage = () => {
    const tables = useSelector(state => {
        console.log('state', state);
        return state.tables
    });

    console.log(tables);
    return <div>
        <h1 className={styles.title}>All      tables</h1>
        <ul className={styles.TableList}>
            {tables.map(table => <TableRow key={table.id} id={table.id} status={table.status} />) }
        </ul>
    </div>
}

export default MainPage;
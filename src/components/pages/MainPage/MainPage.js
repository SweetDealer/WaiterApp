import TableRow from '../../features/TableRow/TableRow';
import { useSelector } from 'react-redux';
import styles from './MainPage.module.css';

const MainPage = () => {
    const tables = useSelector(state => {
        return state.tables
    });

    return <div>
        <h1 className={styles.title}>All tables</h1>
        <ul className={styles.TableList}>
            {tables.map(table => <TableRow key={table.id} id={table.id} status={table.status} />) }
        </ul>
    </div>
}

export default MainPage;
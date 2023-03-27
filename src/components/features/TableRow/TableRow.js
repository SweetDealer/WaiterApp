import styles from './TableRow.module.css';
import { Link } from 'react-router-dom';

const TableRow = props => {
// const openTable 

    return <li className={styles.TableRow}>
        <span>
            <span className={styles.TableNumber}>Table {props.id}</span>
            <span className={styles.TableStatus}>Status: <span className={styles.Status}>{props.status}</span></span>
        </span>
        <Link key={props.id} to={"/table/" + props.id} className={styles.TableRowButton}>
            Show more
        </Link></li>
}

export default TableRow;
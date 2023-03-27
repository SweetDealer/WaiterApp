import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTableById } from "../../../redux/tablesRedux";
import styles from './TablePage.module.css'

const TablePage = () => {
    const { tableId } = useParams();
    const tableData = useSelector(state => getTableById(state, tableId))
    console.log(tableData);
    return <div><div className={styles.title}>Table {tableData.id}</div>
        <form>
            <label>{tableData.status} <input type="text"></input></label>
        </form></div>
}

export default TablePage;
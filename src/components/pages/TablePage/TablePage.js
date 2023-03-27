import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTableById } from "../../../redux/tablesRedux";
import styles from './TablePage.module.css'

const TablePage = () => {
    const { tableId } = useParams();
    const tableData = useSelector(state => getTableById(state, tableId))
    console.log(tableData);

    const change = event => {
        console.log(event.target.value);
    }
    return <div className={styles.tablePage}><h2 className={styles.title}>Table {tableData.id}</h2>
        <form>
            <label className={styles.tablePageProperty}>Status:
                <select name="status" value={tableData.status} className={styles.status}>
                    <option value="Free">Free</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Busy">Busy</option>
                    <option value="Cleaning">Cleaning</option>
                </select>
            </label>
            <label className={styles.tablePageProperty}>People:
                <div><input className={styles.peopleAmount} onChange={change} value={tableData.peopleAmount}></input> / <input className={styles.peopleAmount} value={tableData.maxPeopleAmount}></input></div>
            </label>
            <label className={styles.tablePageProperty}>Bill ($):
                <input className={styles.bill} value={tableData.bill}></input> 
            </label>
            <button className={styles.button}>Update</button>
        </form></div>
}

export default TablePage;
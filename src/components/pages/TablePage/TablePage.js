import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeTableData, fetchTables, getTableById } from "../../../redux/tablesRedux";
import { useEffect } from 'react';
import styles from './TablePage.module.css'

const TablePage = () => {
    const dispatch = useDispatch();

    const { tableId } = useParams();

    const tableData = useSelector(state => getTableById(state, tableId))
    if (!tableData) {
        return '';
    }
    const newTableData = { id: tableId }

    const change = e => {
        const name = e.target.name;
        const value = e.target.value;
        newTableData[name] = value;
        console.log(newTableData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(changeTableData(newTableData))
    }

    return <div className={styles.tablePage}><h2 className={styles.title}>Table {tableData.id}</h2>
        <form onSubmit={handleSubmit}>
            <label className={styles.tablePageProperty}>Status:
                <select name="status" onChange={change} defaultValue={tableData.status} className={styles.status}>
                    <option value="Free">Free</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Busy">Busy</option>
                    <option value="Cleaning">Cleaning</option>
                </select>
            </label>
            <label className={styles.tablePageProperty}>People:
                <div>
                    <input name="peopleAmount" className={styles.peopleAmount} onChange={change} defaultValue={tableData.peopleAmount}></input>
                    <span className={styles.slash}>/</span>
                    <input name="maxPeopleAmount" onChange={change} className={styles.peopleAmount} defaultValue={tableData.maxPeopleAmount}></input>
                </div>
            </label>
            <label className={styles.tablePageProperty}>Bill ($):
                <input name="bill" onChange={change} className={styles.bill} defaultValue={tableData.bill}></input>
            </label>
            <button className={styles.button}>Update</button>
        </form></div>
}

export default TablePage;
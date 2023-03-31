import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { changeTableData, getTableById } from "../../../redux/tablesRedux";
import styles from './TablePage.module.css'

const TablePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tableId } = useParams();

    const tableData = useSelector(state => getTableById(state, tableId));

    const [status, setStatus] = useState(tableData?.state);
    const [peopleAmount, setPeopleAmount] = useState(tableData?.peopleAmount);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData?.maxPeopleAmount)
    const [bill, setBill] = useState(tableData?.bill)

    if (!tableData) {
        console.log(tableData);
        return null;
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(changeTableData({
            id: tableId,
            status, peopleAmount, maxPeopleAmount, bill
        }));
        navigate('/');
    }

    const changeStatus = e => {
        const value = e.target.value
        setBill(0);
        setStatus(value)
    }

    const changePeopleAmount = e => {
        const input = e.target;
        const value = input.valueAsNumber;
        input.setCustomValidity('');
        if ((0 <= value) && (value <= 10)) {
            if (value <= maxPeopleAmount) {
                setPeopleAmount(value);
            }
            else {
                input.setCustomValidity('Value must be less than or equal "Max People Amount"');
                input.reportValidity();
            }
        } else {
            input.setCustomValidity('Value of "People Amount" must be less than or equal 10');
            input.reportValidity();
        }
    }

    const changeMaxPeopleAmount = e => {
        const input = e.target;
        const value = input.valueAsNumber;
        input.setCustomValidity('');
        if ((0 <= value) && (value <= 10)) {
            setMaxPeopleAmount(value);
            setPeopleAmount(value);
        }
        else {
            input.setCustomValidity('Value of "Max People Amount" must be less than or equal 10');
            input.reportValidity();
        }
    }

    const changeBill = e => {
        const input = e.target;
        const value = input.valueAsNumber;
        if (0 <= value) {
            if (status === "Busy") {
                setBill(value)
            }
        }
    }

    return <div className={styles.tablePage}><h2 className={styles.title}>Table {tableData.id}</h2>
        <form onSubmit={handleSubmit}>
            <label className={styles.tablePageProperty}>Status:
                <select name="status" onChange={changeStatus} value={status} className={styles.status}>
                    <option value="Free">Free</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Busy">Busy</option>
                    <option value="Cleaning">Cleaning</option>
                </select>
            </label>
            <label className={styles.tablePageProperty}>People:
                <div>
                    <input
                        name="peopleAmount"
                        type="number"
                        min="0"
                        max="10"
                        onChange={changePeopleAmount} className={styles.peopleAmount} value={peopleAmount}></input>
                    <span className={styles.slash}>/</span>
                    <input name="maxPeopleAmount" type="number" min="0" max="10" onChange={changeMaxPeopleAmount} className={styles.peopleAmount} value={maxPeopleAmount}></input>
                </div>
            </label>
            <label className={styles.tablePageProperty}>Bill ($):
                <input name="bill" type="number" step="any" min="0" onChange={changeBill} className={styles.bill} value={bill} disabled={status !== "Busy"} ></input>
            </label>
            <button className={styles.button}>Update</button>
        </form></div>
}

export default TablePage;
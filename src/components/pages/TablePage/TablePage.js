import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeTableData, getTableById } from "../../../redux/tablesRedux";
import styles from './TablePage.module.css'

const TablePage = () => {
    const dispatch = useDispatch();

    const { tableId } = useParams();

    const tableData = useSelector(state => getTableById(state, tableId))
    if (!tableData) {
        return '';
    }

    const newTableData = { id: tableId };

    const change = e => {
        const name = e.target.name;
        const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
        newTableData[name] = value;
        console.log(newTableData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(changeTableData(newTableData))
    }

    const changeStatus = e => {
        document.querySelector('input[name="bill"]').value = 0;
        newTableData.bill = 0;
        document.querySelector('input[name="bill"]').toggleAttribute('disabled', e.target.value != "Busy");
        change(e);
    }

    const changePeopleAmount = e => {
        const input = e.target;
        const value = input.valueAsNumber;
        input.setCustomValidity('');
        if ((0 <= value) && (value <= 10)) {
            if (value <= document.querySelector('input[name="maxPeopleAmount"]').valueAsNumber) {
                change(e);
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
            if (value > document.querySelector('input[name="peopleAmount"]').valueAsNumber) {
                document.querySelector('input[name="peopleAmount"]').value = value
                change(e)
            }
        }
        else {
            input.setCustomValidity('Value of "Max People Amount" must be less than or equal 10');
            input.reportValidity();
        }
    }

    const changeBill = e => {
        if (0 <= e.target.value) {
            if (document.querySelector('select[name="status"]').value === "Busy") {
                change(e)
            }
        }
    }

        return <div className={styles.tablePage}><h2 className={styles.title}>Table {tableData.id}</h2>
        <form onSubmit={handleSubmit}>
            <label className={styles.tablePageProperty}>Status:
                <select name="status" onChange={changeStatus} defaultValue={tableData.status} className={styles.status}>
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
                        onChange={changePeopleAmount} className={styles.peopleAmount} defaultValue={tableData.peopleAmount}></input>
                    <span className={styles.slash}>/</span>
                    <input name="maxPeopleAmount" type="number" min="0" max="10" onChange={changeMaxPeopleAmount} className={styles.peopleAmount} defaultValue={tableData.maxPeopleAmount}></input>
                </div>
            </label>
            <label className={styles.tablePageProperty}>Bill ($):
                    <input name="bill" type="number" step="any" min="1" onChange={changeBill} className={styles.bill} defaultValue={tableData.bill} disabled={tableData.status !== "Busy"} ></input>
            </label>
            <div name="error" className={styles.error}></div>
            <button className={styles.button}>Update</button>
        </form></div>
}

export default TablePage;
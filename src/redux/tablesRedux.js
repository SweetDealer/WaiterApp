import { API_URL } from "../config";

//selectors
export const getTableById = ({ tables }, tableId) => {
    return tables.find(table => table.id === tableId)
};

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const SET_TABLES = createActionName('SET_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators
export const setTables = payload => ({ type: SET_TABLES, payload });
export const updateTable = payload => ({ type: UPDATE_TABLE, payload })

export const fetchTables = () => {
    return (dispatch) => {
        fetch(`${API_URL}/tables`)
        .then(res => res.json())
            .then(tables => {
                return dispatch(setTables(tables))
            });
    } 
}; 

export const changeTableData = (newTableData) => {
    return (dispatch) => {
        const options = {
            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(
                newTableData
            )
        };

        fetch(`${API_URL}/tables/${newTableData.id}`, options)
            .then(() => {
                dispatch(updateTable(newTableData))
            }) 
    }
}

const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case SET_TABLES:
            return [...action.payload] 
        case UPDATE_TABLE:
            return statePart.map((table) => {
                if (table.id === action.payload.id) {
                   return action.payload
                }
                return table
            })
        default:
            return statePart;
    };
};
export default tablesReducer;
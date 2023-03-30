import { API_URL } from "../config";

//selectors
export const getTableById = ({ tables }, tableId) => {
    return tables.find(table => table.id === tableId)
};

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const SET_TABLES = createActionName('SET_TABLES');

// action creators
export const setTables = payload => ({ type: SET_TABLES, payload });

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
    return () => {
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
    }
}

const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case SET_TABLES:
            return [...action.payload] 
        default:
            return statePart;
    };
};
export default tablesReducer;
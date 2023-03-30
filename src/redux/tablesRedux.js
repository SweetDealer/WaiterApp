//selectors
export const getTableById = ({ tables }, tableId) => {
    return tables.find(table => table.id === tableId)
};

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const SET_TABLES = createActionName('SET_TABLES');

// action creators
export const setTables = payload => ({ type: SET_TABLES, payload });
const url = '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : '');


export const fetchTables = () => {
    return (dispatch) => {
        fetch('http://localhost:3131/api/tables')
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

        fetch(`http:${url}/tables/${newTableData.id}`, options)
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
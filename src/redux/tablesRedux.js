//selectors
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const SET_TABLES = createActionName('SET_TABLES');

// action creators
export const setTables = payload => ({ type: SET_TABLES, payload });

export const fetchTables = () => {
    return (dispatch) => {
        fetch('http://localhost:3131/api/tables')
        .then(res => res.json())
        .then(tables => dispatch(setTables(tables)));
    } 
}; 

const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case SET_TABLES:
            return [...action.payload]
        default:
            return statePart;
    };
};
export default tablesReducer;